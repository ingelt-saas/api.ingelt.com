const express = require("express");
const studentUtil = require("../../utils/student");
const batchUtil = require("../../utils/batch");
const teacherUtil = require("../../utils/teacher");
const adminService = express.Router();

// get total students, current batches , complete batches and total teachers
adminService.get("/", async (req, res) => {
  try {
    const totalStudents = await studentUtil.totalStudents();
    const currentBatches = await batchUtil.currentBatches();
    const completeBatches = await batchUtil.completeBatches();
    const totalTeachers = await teacherUtil.totalTeachers();
    const result = {
      totalStudents,
      currentBatches,
      completeBatches,
      totalTeachers,
    };
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get enrollment data
adminService.get("/enrollmentStudent", async (req, res) => {
  try {
    const result = await studentUtil.enrollmentStudent();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get best students
adminService.get("/bestStudents", async (req, res) => {
  try {
    const result = await studentUtil.bestStudents();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = adminService;
