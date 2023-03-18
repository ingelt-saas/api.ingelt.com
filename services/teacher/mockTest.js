const express = require('express');
const mockTestService = express.Router();
const mockTestUtil = require('../../utils/mockTest');
const mockTestMarksUtil = require('../../utils/mockTestMarks');

// add new mock test
mockTestService.post('/', async (req, res) => {
    try {
        const result = await mockTestUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get mock test by batch
mockTestService.get('/batch/:batchId', async (req, res) => {
    try {
        const result = await mockTestUtil.getMockTestsByBatch(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get mock test marks by mock test
mockTestService.get('/mockTestMarks/:mockTestId', async (req, res) => {
    try {
        const marks = await mockTestMarksUtil.getTestMarksWithStudent(req.params.mockTestId);
        res.status(201).json(marks);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = mockTestService;