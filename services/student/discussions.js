const express = require("express");
const jwt = require("jsonwebtoken");
const discussionUtil = require("../../utils/discussion");
const discussionService = express.Router();

// POST discussion
discussionService.post("/", async (req, res) => {
  try {
    const result = await discussionUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all discussions by batch id
discussionService.get("/all", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const student = jwt.decode(token);

    const result = await discussionUtil.getDiscussionsByBatch(student.batchId);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
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
