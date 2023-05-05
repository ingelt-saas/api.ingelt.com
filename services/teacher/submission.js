const express = require('express');
const submissionService = express.Router();
const submissionUtil = require('../../utils/submission');

// get all submission by assignment id 
submissionService.get('/assignment/:assignmentId', async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const { pageno, limit } = req.query;
        const submission = await submissionUtil.getSubmissionByAssignment(assignmentId, parseInt(pageno), parseInt(limit));
        res.status(200).json(submission);
    } catch (err) {
        res.status(400).send(err);
    }
});

// search submission
submissionService.get('/search/:assignmentId', async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const { s } = req.query;
        const result = await submissionUtil.searchSubmission(assignmentId, s);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update submission
submissionService.put('/:submissionId', async (req, res) => {
    try {
        const result = await submissionUtil.update(req.params.submissionId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = submissionService;