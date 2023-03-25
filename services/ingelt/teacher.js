const express = require("express");
const teacherUtil = require("../../utils/teacher");
const teacherService = express.Router();

// create new teacher
teacherService.post("/", async (req, res) => {
  try {
    const result = await teacherUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get teachers by batch id
teacherService.get("/batch/:batchId", async (req, res) => {
  try {
    const result = await teacherUtil.getTeachersByBatch(req.params.batchId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get a teacher by teacher id
teacherService.get("/:teacherId", async (req, res) => {
  try {
    const result = await teacherUtil.readById(req.params.teacherId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update teacher
teacherService.put("/:teacherId", async (req, res) => {
  try {
    const result = await teacherUtil.update(req.params.teacherId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete teacher
teacherService.delete("/:teacherId", async (req, res) => {
  try {
    const result = await teacherUtil.delete(req.params.teacherId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = teacherService;
