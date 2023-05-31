const express = require("express");
const assignmentUtil = require("../../utils/assignment");
const assignmentService = express.Router();

// GET all assignment
assignmentService.get("/all", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;
    const result = await assignmentUtil.getAssignmentByOrg(orgId, parseInt(pageNo), parseInt(limit), s);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// search assignment by batch id
assignmentService.get('/search', async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const { s, pageno, limit } = req.query;
    const result = await assignmentUtil.searchAssignmentsByStudent(studentId, s, parseInt(pageno), parseInt(limit));
    res.send(result);
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
