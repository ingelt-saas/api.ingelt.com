const express = require("express");
const assignmentUtil = require("../../utils/assignment");
const assignmentService = express.Router();

// GET all assignment
assignmentService.get("/", assignmentUtil.read);

// GET assignment by id
assignmentService.get("/:id", assignmentUtil.readById);
1;

module.exports = assignmentService;
