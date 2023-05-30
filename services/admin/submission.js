const submissionUtil = require('../../utils/submission');
const submissionService = require('express').Router();

// get all submission by assignment id 
submissionService.get('/assignment/:assignmentId', async (req, res) => {
    try {
        const assignmentId = req.params.assignmentId;
        const { s, pageNo, limit } = req.query;
        const submission = await submissionUtil.getSubmissionByAssignment(assignmentId, parseInt(pageNo), parseInt(limit), s);
        res.status(200).json(submission);
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