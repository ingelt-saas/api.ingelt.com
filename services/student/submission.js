const express = require("express");
const submissionService = express.Router();
const submissionUtil = require("../../utils/submission");

// create submission
submissionService.post("/", async (req, res) => {
  try {
    const result = await submissionUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get submission by student
submissionService.get("/get", async (req, res) => {
  try {
    const student = req.headers.authorization.split(" ")[1];
    const studentId = jwt.decode(student).id;

    const result = await submissionUtil.getSubmissionByAssignOrStu(studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = submissionService;
