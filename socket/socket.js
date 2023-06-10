const jwt = require("jsonwebtoken");
const { io } = require("../server");
const discussionUtil = require("../utils/discussion");

// Helper Function
const saveMessageToDB = async (data) => {
  try {
    // decode data.student_auth_token
    const student = jwt.decode(data.student_auth_token);

    // insert discussion record
    newDiscussion = {
      senderId: student.id,
      designation: "student",
      message: data.message,
    };
    const result = await discussionUtil.create(newDiscussion);
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
    socket.broadcast.emit("message-ack", result);
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
