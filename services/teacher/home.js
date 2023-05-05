const express = require("express");
const teacherUtil = require("../../utils/teacher");
const batchUtil = require("../../utils/batch");
const assignmentUtil = require("../../utils/assignment");
const studentUtil = require("../../utils/student");
const homeService = express.Router();

// get teacher by teacher panel
homeService.get('/', async (req, res) => {
  try {

    const teacherId = req.decoded.id;
    const teacher = await teacherUtil.readById(teacherId);
    const liveAndCompleteBatches = await teacherUtil.liveAndCompleteBatches(teacherId);
    const taughtAndBandStudents = await teacherUtil.taughtAndBandStudents(teacherId);

    res
      .status(200)
      .json({ ...teacher, ...liveAndCompleteBatches, ...taughtAndBandStudents });
  } catch (err) {
    res.status(400).send(err);
  }
});

// average band by teacher
homeService.get("/avgBand", async (req, res) => {
  try {
    const teacherId = req.decoded.id
    const result = await batchUtil.avgBand(teacherId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get teacher
homeService.get("/:teacherId", async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const teacher = await teacherUtil.readById(teacherId);
    const liveAndCompleteBatches = await teacherUtil.liveAndCompleteBatches(teacherId);
    const taughtAndBandStudents = await teacherUtil.taughtAndBandStudents(teacherId);

    res
      .status(201)
      .json({ teacher, ...liveAndCompleteBatches, ...taughtAndBandStudents });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// update meeting link
homeService.put("/updateClassLink/:batchId", async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const result = await batchUtil.update(batchId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all batches under the teacher
homeService.get("/batches/:teacherId", async (req, res) => {
  try {
    const result = await batchUtil.getBatchesByTeacher(req.params.teacherId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get students and assignments by batch id
homeService.get("/assignmentsAndStudents/:batchId", async (req, res) => {
  try {
    const assignments = await assignmentUtil.getAssignmentAndSubmission(
      req.params.batchId
    );
    const students = await studentUtil.getStudentsByBatch(req.params.batchId);
    res.status(200).json({ assignments, students });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = homeService;
