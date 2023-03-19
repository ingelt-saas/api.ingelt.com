const express = require("express");
const studentUtil = require("../../utils/student");
const settingsService = express.Router();

// PUT student by id
settingsService.put("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  const updateData = req.body;
  try {
    const result = await studentUtil.update(studentId, updateData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// password update
settingsService.put("/changePassword", async (req, res) => {
  try {
    // change password functionality
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = settingsService;
