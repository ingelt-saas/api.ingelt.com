const express = require("express");
const studentUtil = require("../../utils/student");
const batchUtil = require("../../utils/batch");
const teacherUtil = require("../../utils/teacher");
const { mockTestAvgBand } = require("../../utils/mockTest");
const adminService = express.Router();

// get total students, current batches , complete batches and total teachers
adminService.get("/", async (req, res) => {
  const organizationId = req.headers.organization;
  try {
    const totalStudents = await studentUtil.totalStudents(organizationId);
    const currentBatches = await batchUtil.currentBatches(organizationId);
    const completeBatches = await batchUtil.completeBatches(organizationId);
    const totalTeachers = await teacherUtil.totalTeachers(organizationId);
    const result = {
      totalStudents,
      currentBatches,
      completeBatches,
      totalTeachers,
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get enrollment data
adminService.get("/enrollmentStudent", async (req, res) => {
  try {
    const result = await studentUtil.enrollmentStudent(req.params.batchId, req.headers.organization);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get best students in the organization
adminService.get("/bestStudents", async (req, res) => {
  try {
    const result = await studentUtil.bestStudents(req.headers.organization);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// average band per batch
adminService.get('/avgBand/:batchId', async (req, res) => {
  try {
    const result = await mockTestAvgBand(req.params.batchId, req.headers.organization);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = adminService;
