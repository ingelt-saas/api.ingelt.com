const express = require("express");
const jwt = require("jsonwebtoken");
const studentUtil = require("../../utils/student");
const batchUtil = require("../../utils/batch");
const mockTestMarksUtil = require("../../utils/mockTestMarks");
const homeService = express.Router();

// GET student by id
homeService.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const student = jwt.decode(token);
    res.status(200).json(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get meet link
homeService.get("/meetLink/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const student = jwt.decode(token);

    const result = await batchUtil.readById(student.batchId);
    const batchId = { classroomLink: result.classroomLink };
    res.json(batchId);
  } catch (err) {
    res.status(400).send(err);
  }
});

// avg band
homeService.get("/bands", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const student = jwt.decode(token);
    const avgBand = await studentUtil.bandScore(student.id);
    res.json(avgBand);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get mock test marks
homeService.get("/mockTestMarks", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const student = jwt.decode(token);

    const marks = await mockTestMarksUtil.getMockTestMarksByStudent(student.id);

    // Filter Out Marks Only + MockTestId
    const result = [];
    marks.map((obj) => {
      result.push({
        listeningBands: obj.listeningBands,
        readingBands: obj.readingBands,
        writingBands: obj.writingBands,
        speakingBands: obj.speakingBands,
        mockTestId: obj.mockTestId,
      });
    });

    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = homeService;
