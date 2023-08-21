const express = require("express");
const studentUtil = require("../../utils/student");
const appliedStudentsUtils = require("../../utils/appliedStudents");
const studentService = express.Router();
const deleteFile = require('../../aws/delete');

// POST new student
studentService.post("/", async (req, res) => {
  try {
    const result = await studentUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// applied student
studentService.get('/appliedStudents', async (req, res) => {
  try {
    const { s, pageNo, limit } = req.query;
    const result = await appliedStudentsUtils.getAllAppliedStudents(parseInt(pageNo), parseInt(limit), s);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// applied student
studentService.put('/acceptStudent/:id', async (req, res) => {
  try {
    const getAppliedRow = await appliedStudentsUtils.readById(req.params.id);

    // student org id update
    await studentUtil.update(getAppliedRow.studentId, { organizationId: getAppliedRow.organizationId });

    const result = await appliedStudentsUtils.acceptStudent(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all student in the database
studentService.get("/getall", async (req, res) => {
  try {
    const { s, pageNo, limit, filter, mode } = req.query;
    const result = await studentUtil.readForInGelt(parseInt(pageNo), parseInt(limit), filter, mode, s);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// search students
studentService.get("/searchStudents", async (req, res) => {
  try {
    const { s } = req.query;
    const result = await studentUtil.searchStudents(s);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all student in the database
studentService.get("/", async (req, res) => {
  try {
    const result = await studentUtil.readAll();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get student by batch id
studentService.get("/batch/:batchId", async (req, res) => {
  const batchId = req.params.batchId;
  try {
    const result = await studentUtil.getStudentsByBatch(batchId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get a student by student id
studentService.get("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const result = await studentUtil.readById(studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update student
studentService.put("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  const updateData = req.body;
  try {
    const result = await studentUtil.update(studentId, updateData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete student
studentService.delete("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const getStudent = await studentUtil.readById(studentId);
    getStudent.image && await deleteFile(getStudent.image);
    const result = await studentUtil.delete(studentId);
    res.status(208).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = studentService;
