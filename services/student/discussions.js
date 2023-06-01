const express = require("express");
const jwt = require("jsonwebtoken");
const discussionUtil = require("../../utils/discussion");
const discussionService = express.Router();
const awsUpload = require('../../aws/upload');
const { memoryStorage } = require("multer");
const multer = require("multer");

const storage = memoryStorage();
const upload = multer({ storage });

// POST discussion
discussionService.post("/", async (req, res) => {
  try {
    const newDiscussion = req.body;
    newDiscussion.designation = 'student';
    newDiscussion.senderName = req.decoded.name;
    newDiscussion.senderId = req.decoded.id;
    newDiscussion.senderImage = req.decoded.image;
    newDiscussion.senderCountry = req.decoded.country;
    const result = await discussionUtil.create(newDiscussion);
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

//post a Image to the discussions
discussionService.post('/sendImage', upload.single('image'), async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const file = req.file;
    const newDiscussion = req.body;
    newDiscussion.designation = 'student';
    newDiscussion.senderName = req.decoded.name;
    newDiscussion.senderId = req.decoded.id;
    newDiscussion.senderImage = req.decoded.image;
    newDiscussion.senderCountry = req.decoded.country;
    const result = await discussionUtil.create(newDiscussion);

    awsUpload(file, 'student/profile', async (err, data) => {
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
});

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
