const express = require("express");
const jwt = require("jsonwebtoken");
const adminUtil = require("../../utils/admin");
const studentUtil = require("../../utils/student");
const batchUtil = require("../../utils/batch");
const teacherUtil = require("../../utils/teacher");
const { mockTestAvgBand } = require("../../utils/mockTest");
const adminService = express.Router();

// Get Admin
adminService.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.decode(token);
    res.status(200).json(admin);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get total students, current batches , complete batches and total teachers
adminService.get("/stats-one", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.decode(token);
    const organizationId = admin.organizationId;

    const totalStudents = await studentUtil.totalStudents(organizationId);
    const currentBatches = await batchUtil.currentBatchesCount(organizationId);
    const completeBatches = await batchUtil.completeBatchesCount(
      organizationId
    );
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
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.decode(token);
    const organizationId = admin.organizationId;

    const result = await studentUtil.enrollmentStudent(
      req.params.batchId,
      organizationId
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get best students in the organization
adminService.get("/bestStudents", async (req, res) => {
  try {
    const result = await studentUtil.bestStudents(req.decoded.id);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// average band per batch
adminService.get("/avgBand/:batchId", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.decode(token);
    const organizationId = admin.organizationId;

    const result = await mockTestAvgBand(req.params.batchId, organizationId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = adminService;
