const express = require("express");
const studentUtil = require("../../utils/student");
const studentService = express.Router();

// POST new student
studentService.post("/", async (req, res) => {
  try {
    const result = await studentUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all student
studentService.get("/", async (req, res) => {
  try {
    const result = await studentUtil.read();
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
    const result = await studentUtil.delete(studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = studentService;
