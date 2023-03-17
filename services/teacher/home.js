const express = require('express');
const teacherUtil = require('../../utils/teacher');
const batchUtil = require('../../utils/batch');
const homeService = express.Router();

// get teacher 
homeService.get('/:teacherId', async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await teacherUtil.readById(teacherId);
        const liveAndCompleteBatches = await teacherUtil.liveAndCompleteBatches(teacherId);
        const taughtAndBandStudents = await teacherUtil.taughtAndBandStudents(teacherId);
        res.status(201).json({ teacher, ...liveAndCompleteBatches, ...taughtAndBandStudents });
    } catch (err) {
        res.status(400).send(err);
    }
});

// update meeting link
homeService.put('/updateClassLink/:batchId', async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const result = await batchUtil.update(batchId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

// average band per batch
homeService.get('/avgBand/:batchId', async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const result = await batchUtil.
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = homeService;