const express = require("express");
const assignmentUtil = require("../../utils/assignment");
const assignmentService = express.Router();

// GET all assignment
assignmentService.get("/all", async (req, res) => {
  try {

    const batchId = req.decoded.batchId;
    const studentId = req.decoded.id;
    const result = await assignmentUtil.getAssignmentsByBatchAndStu(batchId, studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// search assignment by batch id
assignmentService.get('/search/:searchQuery', async (req, res) => {
  try {

  } catch (err) {
    res.status(400).json(err);
  }
});

// GET assignment by id
assignmentService.get("/:assignmentId", async (req, res) => {
  try {
    const result = await assignmentUtil.readById(req.params.assignmentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = assignmentService;
