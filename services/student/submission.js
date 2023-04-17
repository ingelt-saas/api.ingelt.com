const express = require("express");
const submissionService = express.Router();
const submissionUtil = require("../../utils/submission");
const { memoryStorage } = require("multer");
const multer = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');

// create submission
submissionService.post("/", upload.single('file'), async (req, res) => {
  try {

    const student = req.headers.authorization.split(" ")[1];
    const studentId = jwt.decode(student).id;
    const file = req.file;

    // upload to aws 
    awsUpload(file, 'student/submission', async (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const newSubmission = {
          assignmentId: req.body.assignmentId,
          studentId: studentId,
          file: data.Key,
        };
        const result = await submissionUtil.create(newSubmission);
        res.status(201).json(result);
      }
    });

  } catch (err) {
    res.status(400).send(err);
  }
});

// get submission by student and assignment
submissionService.get('assignment/:assignmentId', async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const assignmentId = req.params.assignmentId;
    const result = await submissionUtil.getSubmissionByAssignAndStu(assignmentId, studentId);
    return result;
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
    findSubmission?.file && await deleteFile(findSubmission.file);
    // delete data from db
    const result = await submissionUtil.delete(req.params.submissionId);
    res.json(result);

  } catch (err) {
    res.status(400).send(err);
  }
})

module.exports = submissionService;
