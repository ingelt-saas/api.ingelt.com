const express = require('express');
const discussionService = express.Router();
const discussionUtil = require('../../utils/discussion');

// create new discussion message
discussionService.post('/', async (req, res) => {
    try {
        const result = await discussionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

// get discussion by batch id
discussionService.get('/batch/:batchId', async (req, res) => {
    try {
        const result = await discussionUtil.getDiscussionsByBatch(req.params.batchId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = discussionService;