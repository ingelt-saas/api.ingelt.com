const express = require("express");
const studentUtil = require("../../utils/student");
const settingsService = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const awsUpload = require('../../aws/upload');
const { memoryStorage } = require("multer");
const multer = require("multer");
const deleteFile = require("../../aws/delete");

const storage = memoryStorage();
const upload = multer({ storage });

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
settingsService.put('/updateProfile', upload.single('image'), async (req, res) => {
  try {

    const studentId = req.decoded.id;
    const file = req.file;

    const student = studentUtil.readById(studentId);

    awsUpload(file, 'student/profile', async (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        // delete file from aws
        student?.image && await deleteFile(student.image);

        await studentUtil.update(studentId, { image: data.key }); // update image in db
        res.json({ image: data.key });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// password update
settingsService.put("/updatePassword", async (req, res) => {
  try {

    const student = req.decoded;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const previousPassword = req.body.previousPassword;

    // change password functionality
    if (await bcrypt.compare(previousPassword, student.password)) {
      const result = await studentUtil.update(student.id, { password: hashedPassword });
      res.json(result);
    } else {
      res.json({ status: 'bad', message: 'Previous password does not match' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = settingsService;
