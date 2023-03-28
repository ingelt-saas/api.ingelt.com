const express = require("express");
const fileUploadService = require("../../uploads");
const studentUtil = require("../../utils/student");
const settingsService = express.Router();

// PUT student by id
settingsService.put("/", async (req, res) => {
  const student = req.headers.authorization.split(" ")[1];
  const studentId = jwt.decode(student).id;
  const updateData = req.body;
  try {
    const result = await studentUtil.update(studentId, updateData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update profile picture
settingsService.put('/updateProfile', fileUploadService('profile').single('image'), async (req, res) => {
  try {
    const student = req.headers.authorization.split(" ")[1];
    const studentId = jwt.decode(student).id;
    const file = req.file;
    await studentUtil.update(studentId, { image: file.filename });
    res.send({ filename: file.filename });
  } catch (err) {
    res.status(400).send(err);
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
