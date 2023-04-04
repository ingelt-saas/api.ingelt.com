const express = require("express");
const fileUploadService = require("../../uploads");
const studentUtil = require("../../utils/student");
const settingsService = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const awsUpload = require('../../aws/upload');
const deleteFile = require("../../uploads/deleteFile");

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

    awsUpload(path.join(__dirname, file.path), 'student/profile', file.filename, async (err, data) => {
      deleteFile(`profile/${file.filename}`); // file delete
      if (err) {
        res.status(400).send(err);
      } else {
        await studentUtil.update(studentId, { image: data.Location }); // update image in db
        res.json({ filename: data.Location });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// password update
settingsService.put("/updatePassword", async (req, res) => {
  try {

    const student = req.headers.authorization.split(" ")[1];
    const studentId = jwt.decode(student).id;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const previousPassword = req.body.previousPassword;

    // change password functionality
    if (await bcrypt.compare(previousPassword, studentId.password)) {
      const result = await studentUtil.update(studentId, { password: hashedPassword });
      res.json(result);
    } else {
      res.json({ status: 'bad', message: 'Previous password does not match' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = settingsService;
