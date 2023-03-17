const express = require('express');
const assignmentService = express.Router();
const assignmentUtil = require('../../utils/assignment');

// add new assignment
assignmentService.post('/', async (req, res) => {
    try {
        const result = await assignmentUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all assignments by per batch 
assignmentService.get('/batch/:batchId', async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const assignments = await assignmentUtil.getAssignmentsByBatch(batchId);
        return assignments;
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = assignmentService;