const express = require("express");
const jwt = require("jsonwebtoken");
const batchUtil = require("../../utils/batch");
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

// get all batches name using organization id
studentService.get("/batches", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const orgId = jwt.decode(token).organizationId;

    // All Batches
    let result = await batchUtil.batchesActive(orgId);
    result = result.map((batch) => {
      return {
        id: batch.id,
        name: batch.name,
      };
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get all students by orgId
studentService.get("/all", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const orgId = jwt.decode(token).organizationId;

    const result = await studentUtil.allStuByOrgId(orgId);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get all student by batch
studentService.get("/batch/:batchId", async (req, res) => {
  try {
    const result = await studentUtil.getStudentsByBatch(req.params.batchId);
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
