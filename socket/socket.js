const jwt = require("jsonwebtoken");
const { io } = require("../server");
const discussionUtil = require("../utils/discussion");
const awsUpload = require('../aws/upload');
const { default: axios } = require("axios");
const discussionImagesUtil = require('../utils/discussionImages');
const studentActivityUtil = require("../utils/studentActivity");

// Helper Function
const saveMessageToDB = async (data) => {
  try {
    // decode data.student_auth_token
    const student = jwt.decode(data.student_auth_token);

    const getImageType = (buffer) => {
      const uint8Array = new Uint8Array(buffer);
      let imageType = null;

      if (uint8Array && uint8Array.length >= 2) {
        if (uint8Array[0] === 0xFF && uint8Array[1] === 0xD8) {
          imageType = 'image/jpeg';
        } else if (uint8Array[0] === 0x89 && uint8Array[1] === 0x50) {
          imageType = 'image/png';
        } else if (uint8Array[0] === 0x47 && uint8Array[1] === 0x49) {
          imageType = 'image/gif';
        } else if (uint8Array[0] === 0x42 && uint8Array[1] === 0x4D) {
          imageType = 'image/bmp';
        }
      }

      return imageType;
    }

    const uploadFileToS3 = (file, filepath) =>
      new Promise(async (resolve, reject) => {

        // let type = file.split(';')[0];
        // type = type.split(':')[1];

        // const res = await axios.get(file, { responseType: 'arraybuffer' });
        // const imageBuffer = Buffer.from(file, 'binary');

        awsUpload({ buffer: file, mimetype: getImageType(file) }, filepath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            console.log(data)
            resolve(data);
          }
        });
      });

    const uploadedImages = [];
    for (let file of data.images) {
      const result = await uploadFileToS3(file, "discussion"); // upload to asw s3 cloud
      uploadedImages.push(result);
    }

    // insert discussion record
    newDiscussion = {
      senderId: student.id,
      designation: "student",
      message: data.message,
      parentDiscussionId: data.parentDiscussionId,
    };
    const result = await discussionUtil.create(newDiscussion);

    // insert images record
    for (let image of uploadedImages) {
      await discussionImagesUtil.create({
        image: image.Key,
        discussionId: result.id,
      });
    }

    return result;
  } catch (err) {
    console.log(err);
  }
};

io.on("connect", (socket) => {
  console.log(`🔌 Client Connected: ${socket.id}`);

  // Message Reciever
  socket.on("message", async (data) => {
    // Add Message to Database

    const result = await saveMessageToDB(data);
    const getDiscussion = await discussionUtil.readById(result.id);
    socket.broadcast.emit("message-ack", getDiscussion);
    // socket.emit("message-ack", getDiscussion);
  });

  // student active status
  socket.on('studentActivity', async (data) => {
    // decode data.student_auth_token
    const student = jwt.decode(data.student_auth_token);
    if (student) {
      await studentActivityUtil.updateOnlineStatus(student.id);
    }

    // const getActiveStudents = await studentActivityUtil.getActiveStudents();
    // socket.broadcast.emit('active-students', getActiveStudents); // send active students to godseye

  });

  // Leave Room
  socket.on("leave-room", (room) => {
    socket.leave(room);
    socket.emit("room-left");
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client Disconnected: ${socket.id}`);
  });
});