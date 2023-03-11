const express = require("express");
const studentUtil = require("../../utils/student");
const studentService = express.Router();

// GET student by id
studentService.get("/:id", studentUtil.readById);

module.exports = studentService;
