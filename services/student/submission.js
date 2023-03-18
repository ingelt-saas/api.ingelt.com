const express = require('express');
const submissionService = express.Router();
const submissionUtil = require('../../utils/submission');

// create submission
submissionService.post('/', async (req, res) => {
    try {
        const result = await submissionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get submission by student
submissionService.post('/student/:studentId', async (req, res) => {
    try {
        const result = await submissionUtil.getSubmissionByAssignOrStu(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = submissionService;