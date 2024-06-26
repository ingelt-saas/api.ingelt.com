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

    const studentId = req.decoded.id;
    const assignmentId = req.body.assignmentId;
    const file = req.file;

    // upload to aws 
    awsUpload(file, 'student/submission', async (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {

        // check if submission has before
        const getSubmission = await submissionUtil.getSubmissionByAssignAndStu(assignmentId, studentId)

        if (getSubmission) {
          getSubmission.file && await deleteFile(getSubmission.file); // delete previous file
          await submissionUtil.update(getSubmission.id, { file: data.Key, submissionDate: Date.now() }); // updated current file
          res.json({ message: 'UPDATED' });
        } else {
          const newSubmission = {
            assignmentId: assignmentId,
            studentId: studentId,
            file: data.Key,
          };
          const result = await submissionUtil.create(newSubmission);

          res.status(201).json(result);
        }
      }
    });

  } catch (err) {
    res.status(400).send(err);
  }
});

// get submission by student and assignment
submissionService.get('/assignment/:assignmentId', async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const assignmentId = req.params.assignmentId;
    const result = await submissionUtil.getSubmissionByAssignAndStu(assignmentId, studentId);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get submission by student
submissionService.get("/", async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const result = await submissionUtil.getSubmissionByStudent(studentId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// submission update
submissionService.put("/:submissionId", async (req, res) => {
  try {
    const result = await submissionUtil.update(
      req.params.submissionId,
      { ...req.body, submissionDate: Date.now() }
    );
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// submission delete
submissionService.delete("/:submissionId", async (req, res) => {
  try {
    // get the file
    const findSubmission = await submissionUtil.readById(
      req.params.submissionId
    );

    // delete file
    findSubmission?.file && await deleteFile(findSubmission.file);

    // delete data from db
    const result = await submissionUtil.delete(req.params.submissionId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = submissionService;
