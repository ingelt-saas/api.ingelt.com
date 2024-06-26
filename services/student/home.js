const express = require("express");
const jwt = require("jsonwebtoken");
const studentUtil = require("../../utils/student");
const batchUtil = require("../../utils/batch");
const mockTestMarksUtil = require("../../utils/mockTestMarks");
const submissionUtil = require("../../utils/submission");
const eventUtil = require("../../utils/event");
const inGeltUtil = require("../../utils/ingelt");
const homeService = express.Router();

// GET student by id
homeService.get("/", async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const result = await studentUtil.readById(studentId);
    const inGelt = await inGeltUtil.getInGelt();
    if (inGelt) {
      delete inGelt.password;
      delete inGelt.email;
      delete inGelt.id;
    }
    res.status(200).json({ ...result, ...inGelt });
  } catch (err) {
    res.status(400).send(err);
  }

});

// get meet link
homeService.get("/meetLink", async (req, res) => {
  try {
    const student = req.decoded;
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
    const student = req.decoded;
    const avgBand = await studentUtil.bandScore(student.id);
    res.json(avgBand);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get mock test marks
homeService.get("/mockTestMarks", async (req, res) => {
  try {
    const student = req.decoded;

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

// get submissions with assignment
homeService.get("/submissions", async (req, res) => {
  try {
    const studentId = req.decoded.id;
    const result = await submissionUtil.getSubmissionByStudent(studentId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get upcoming event
homeService.get('/upcomingEvent', async (req, res) => {
  try {
    const result = await eventUtil.upcomingEvent();
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// book event
homeService.post('/bookEvent', async (req, res) => {
  try {
    const bookingData = req.body;
    bookingData.studentId = req.decoded.id;
    const result = await eventUtil.bookEvent(bookingData);
    res.json(result);

  } catch (err) {
    res.status(400).send(err);
  }
});


module.exports = homeService;
