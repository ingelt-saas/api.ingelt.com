const express = require("express");
const teacherUtil = require("../../utils/teacher");
const { memoryStorage } = require("multer");
const multer = require("multer");
const teacherService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');

// add new teacher
teacherService.post("/", upload.single('image'), async (req, res) => {
  try {

    const file = req.file;
    const newTeacher = req.body;
    newTeacher.organizationId = req.decoded.organizationId;

    // check ani teacher has with this email
    const getTeacher = await teacherUtil.readByEmail(req.body.email);

    // aws upload
    const __awsUpload = () => new Promise((resolve, reject) => {
      awsUpload(file, 'teacher/profile', async (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (getTeacher) {
      return res.status(208).send({ message: 'Teacher exists at this email.' });
    }

    if (file) {
      const data = await __awsUpload();
      newTeacher.image = data.Key;
    }

    const result = await teacherUtil.create(newTeacher);
    res.status(201).json(result);

  } catch (err) {
    res.status(400).send(err);
  }
});

// add teacher in a batch
teacherService.post("/add-batch", async (req, res) => {
  try {
    const result = await teacherUtil.addTeacherInBatch(req.body);
    res.send(result);
  } catch (err) {
    res.status(err).send(err);
  }
});

// get all teacher in the organization
teacherService.get("/getall", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { pageno, limit } = req.query;
    const result = await teacherUtil.readByOrg(orgId, parseInt(pageno), parseInt(limit));
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search teacher
teacherService.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.s;
    const result = await teacherUtil.search(searchQuery);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search teachers in the organization
teacherService.get("/search/organization", async (req, res) => {
  try {
    const { s, pageNo, limit } = req.query;
    const orgId = req.decoded.organizationId;
    const result = await teacherUtil.searchByOrg(orgId, s, parseInt(pageNo), parseInt(limit));
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get a teacher by teacher id and additional info
teacherService.get("/:teacherId", async (req, res) => {
  try {
    // get teacher
    let teacher = await teacherUtil.readById(req.params.teacherId);
    if (!teacher) {
      return res.send(null);
    }

    // get complete batch and live batch by teacher id
    const batches = await teacherUtil.liveAndCompleteBatches(
      req.params.teacherId
    );

    const students = await teacherUtil.taughtAndBandStudents(
      req.params.teacherId
    );

    res.status(200).send({ ...teacher, ...batches, ...students });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// get teachers by batch id
teacherService.get("/batch/:batchId", async (req, res) => {
  try {
    const { pageno, limit } = req.query;
    const result = await teacherUtil.getTeachersByBatch(req.params.batchId, parseInt(pageno), parseInt(limit));
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// teacher subject updated
teacherService.put("/subjectUpdate/:id", async (req, res) => {
  const subject = req.body.subject;
  try {
    const result = await teacherUtil.teacherSubjectUpdate(req.params.id, subject);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// update teacher
teacherService.put("/:teacherId", async (req, res) => {
  try {
    const result = await teacherUtil.update(req.params.teacherId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete teacher from a batch
teacherService.delete("/:batchId/:teacherId", async (req, res) => {
  try {
    const result = await teacherUtil.deleteTeacherFromBatch(
      req.params.batchId,
      req.params.teacherId
    );
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete teacher
teacherService.delete("/:teacherId", async (req, res) => {
  try {
    const result = await teacherUtil.delete(req.params.teacherId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = teacherService;
