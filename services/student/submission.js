const express = require("express");
const submissionService = express.Router();
const submissionUtil = require("../../utils/submission");
const uploadService = require('../../uploads/index');

// create submission
submissionService.post("/", uploadService('submissions').single('file'), async (req, res) => {
  try {
    const file = req.file;
    const newSubmission = {
      assignmentId: req.body.assignmentId,
      studentId: req.body.studentId,
      file: file.filename,
    };
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
