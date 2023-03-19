const express = require("express");
const assignmentUtil = require("../../utils/assignment");
const assignmentService = express.Router();

// GET all assignment
assignmentService.get("/all/:batchId", async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const result = await assignmentUtil.getAssignmentsByBatch(batchId);
    res.status(201).json(result);
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
