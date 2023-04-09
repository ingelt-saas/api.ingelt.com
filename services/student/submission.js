const express = require("express");
const submissionService = express.Router();
const submissionUtil = require("../../utils/submission");

// create submission
submissionService.post("/", async (req, res) => {
  try {

    const student = req.headers.authorization.split(" ")[1];
    const studentId = jwt.decode(student).id;

    const file = req.file;
    const newSubmission = {
      assignmentId: req.body.assignmentId,
      studentId: studentId,
      file: file.filename,
    };
    const result = await submissionUtil.create(newSubmission);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get submission by student
submissionService.get("/", async (req, res) => {
  try {
    const student = req.headers.authorization.split(" ")[1];
    const studentId = jwt.decode(student).id;

    const result = await submissionUtil.getSubmissionByAssignOrStu(studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// submission update
submissionService.put('/:submissionId', async (req, res) => {
  try {
    const result = await submissionUtil.update(req.params.submissionId, req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// submission delete
submissionService.delete('/:submissionId', async (req, res) => {
  try {
    // get the file
    const findSubmission = await submissionUtil.readById(req.params.submissionId);
    // delete file
    findSubmission?.file && await deleteFile(`uploads/submissions/${findSubmission?.file}`);
    // delete data from db
    const result = await submissionUtil.delete(req.params.submissionId);
    res.json(result);

  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = submissionService;
