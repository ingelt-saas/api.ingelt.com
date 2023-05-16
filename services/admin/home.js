const express = require("express");
const jwt = require("jsonwebtoken");
const adminUtil = require("../../utils/admin");
const studentUtil = require("../../utils/student");
const batchUtil = require("../../utils/batch");
const teacherUtil = require("../../utils/teacher");
const { mockTestAvgBand } = require("../../utils/mockTest");
const organizationUtil = require("../../utils/organization");
const adminService = express.Router();

// Get Admin
adminService.get("/", async (req, res) => {
  try {
    const adminId = req.decoded.id;
    const result = await adminUtil.readById(adminId)
    res.send(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get total students, current batches , complete batches and total teachers
adminService.get("/stats-one", async (req, res) => {
  try {

    const organizationId = req.decoded.organizationId;

    const totalStudents = await studentUtil.totalStudents(organizationId);
    const currentBatches = await batchUtil.currentBatchesCount(organizationId);
    const completeBatches = await batchUtil.completeBatchesCount(organizationId);
    const totalTeachers = await teacherUtil.totalTeachers(organizationId);
    const activeStudents = await studentUtil.activeStudentsByOrg(organizationId);

    const result = {
      totalStudents,
      currentBatches,
      completeBatches,
      totalTeachers,
      activeStudents
    };

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// enrollment students
adminService.get('/enrollmentStudents', async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const result = await studentUtil.enrollmentStudentByOrg(orgId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get enrollment graph data by every year and month 
adminService.get('/enrollmentStudents/walk-in/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const orgId = req.decoded.organizationId;
    const result = await studentUtil.enrollmentStudentByWalkIn(orgId, year);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get enrollment graph data by every year and month 
adminService.get('/enrollmentStudents/ingelt/:year', async (req, res) => {
  try {
    const year = req.params.year;
    const orgId = req.decoded.organizationId;
    const result = await studentUtil.enrollmentStudentByInGelt(orgId, year);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// total revenue
adminService.get('/totalRevenue', async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const result = await organizationUtil.totalRevenueByOrg(orgId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// walk-in revenue by every month  and year
adminService.get('/revenue/walk-in/:year', async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const year = req.params.year;
    const result = await organizationUtil.walkInRevenueByOrg(orgId, year);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// ingelt revenue by every month  and year
adminService.get('/revenue/ingelt/:year', async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const year = req.params.year;
    const result = await organizationUtil.inGeltRevenueByOrg(orgId, year);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get enrollment data
adminService.get("/enrollmentStudent/:batchId", async (req, res) => {
  try {

    const batchId = req.params.batchId;
    const organizationId = req.decoded.organizationId;

    const result = await studentUtil.enrollmentStudent(
      batchId,
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
