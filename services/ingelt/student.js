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

module.exports = studentService;
