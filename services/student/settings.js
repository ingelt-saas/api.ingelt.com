const express = require("express");
const studentUtil = require("../../utils/student");
const settingsService = express.Router();

// PUT student by id
settingsService.put("/:id", studentUtil.update);

module.exports = settingsService;
