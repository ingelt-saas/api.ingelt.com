const express = require("express");
const teacherUtil = require("../../utils/teacher");
const teacherService = express.Router();

// add new teacher
teacherService.post("/", async (req, res) => {
  try {
    const result = await teacherUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// add teacher in a batch 
teacherService.post('/add-batch', async (req, res) => {
  try {
    const result = await teacherUtil.addTeacherInBatch(req.body);
    res.send(result);
  } catch (err) {
    res.status(err).send(err);
  }
})

// get all teacher in the organization
teacherService.get("/", async (req, res) => {
  try {
    const result = await teacherUtil.read(req.headers.organization);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// search teacher
teacherService.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.s;
    const result = await teacherUtil.search(searchQuery);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
})

// get a teacher by teacher id and additional info
teacherService.get("/:teacherId", async (req, res) => {
  try {
    // get teacher
    const teacher = (await teacherUtil.readById(req.params.teacherId))?.get({ plain: true });

    // get complete batch and live batch by teacher id
    const batches = await teacherUtil.liveAndCompleteBatches(
      req.params.teacherId
    );

    const students = await teacherUtil.taughtAndBandStudents(req.params.teacherId);

    res.status(201).send({ ...teacher, ...batches, ...students });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// get teachers by batch id
teacherService.get("/batch/:batchId", async (req, res) => {
  try {
    const result = await teacherUtil.getTeachersByBatch(req.params.batchId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// teacher subject updated
teacherService.put('/:batchId/:teacherId', async (req, res) => {
  const batchId = req.params.batchId;
  const teacherId = req.params.teacherId;
  const subject = req.body.subject;
  try {
    const result = await teacherUtil.teacherSubjectUpdate(batchId, teacherId, subject);
    res.send(result);
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
teacherService.delete('/:batchId/:teacherId', async (req, res) => {
  try {
    const result = await teacherUtil.deleteTeacherFromBatch(req.params.batchId, req.params.teacherId);
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
