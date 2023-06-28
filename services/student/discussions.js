const express = require("express");
const jwt = require("jsonwebtoken");
const discussionUtil = require("../../utils/discussion");
const discussionService = express.Router();
const awsUpload = require("../../aws/upload");
const { memoryStorage } = require("multer");
const multer = require("multer");
const discussionImagesUtil = require("../../utils/discussionImages");
const e = require("express");
const studentUtil = require("../../utils/student");
const teacherUtil = require("../../utils/teacher");

const storage = memoryStorage();
const upload = multer({ storage });

// POST discussion
discussionService.post("/", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;

    const uploadFileToS3 = (file, filepath) =>
      new Promise((resolve, reject) => {
        awsUpload(file, filepath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

    const uploadedImages = [];
    for (let file of files) {
      const result = await uploadFileToS3(file, "discussion"); // upload to asw s3 cloud
      uploadedImages.push(result);
    }

    const newDiscussion = req.body;
    newDiscussion.designation = "student";
    newDiscussion.senderId = req.decoded.id;
    // insert discussion record
    const result = await discussionUtil.create(newDiscussion);

    // insert images record
    for (let image of uploadedImages) {
      await discussionImagesUtil.create({
        image: image.Key,
        discussionId: result.id,
      });
    }

    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all discussions by batch id
discussionService.get("/all", async (req, res) => {
  try {
    const { pageno, limit } = req.query;
    const result = await discussionUtil.read(parseInt(pageno), parseInt(limit));
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//get count of all student and teacher from the database
discussionService.get("/count", async (req, res) => {
  try {
    const result = await discussionUtil.countAll();
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//post a Image to the discussions
discussionService.post(
  "/sendImage",
  upload.single("image"),
  async (req, res) => {
    try {
      const studentId = req.decoded.id;
      const file = req.file;
      const newDiscussion = req.body;
      newDiscussion.designation = "student";
      newDiscussion.senderName = req.decoded.name;
      newDiscussion.senderId = req.decoded.id;
      newDiscussion.senderImage = req.decoded.image;
      newDiscussion.senderCountry = req.decoded.country;
      const result = await discussionUtil.create(newDiscussion);

      awsUpload(file, "student/profile", async (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          await studentUtil.update(studentId, { image: data.key }); // Update image in the database
          res.json({ image: data.key });
        }
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// delete discussion
discussionService.delete("/:discussionId", async (req, res) => {
  try {
    const result = await discussionUtil.delete(req.params.discussionId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = discussionService;
