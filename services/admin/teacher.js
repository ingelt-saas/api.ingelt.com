const express = require('express');
const teacherUtil = require('../../utils/teacher');
const teacherService = express.Router();

// add new teacher 
teacherService.post('/', async (req, res) => {
    try {
        const result = await teacherUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all teacher 
teacherService.get('/', async (req, res) => {
    try {
        const result = await teacherUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get a teacher by teacher id and additional info 
teacherService.get('/:teacherId', async (req, res) => {
    try {
        // get teacher 
        const teacher = await teacherUtil.readById(req.params.teacherId);
        // get complete batch and live batch by teacher id 
        const batches = await teacherUtil.liveAndCompleteBatches(req.params.teacherId);

        res.status(201).send({ teacher, ...batches });
    } catch (err) {
        res.status(400).send(err);
    }
});

// get teachers by batch id
teacherService.get('/batch/:batchId', async (req, res) => {
    try {
        const result = await teacherUtil.getTeachersByBatch(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update teacher
teacherService.put('/:teacherId', async (req, res) => {
    try {
        const result = await teacherUtil.update(req.params.teacherId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete teacher
teacherService.delete('/:teacherId', async (req, res) => {
    try {
        const result = await teacherUtil.delete(req.params.teacherId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = teacherService;