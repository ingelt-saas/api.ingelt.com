const express = require('express');
const discussionService = express.Router();
const discussionUtil = require('../../utils/discussion');

// create new discussion message
discussionService.post('/', async (req, res) => {
    try {
        const teacher = req.decoded;
        req.body.senderId = teacher.id;
        req.body.designation = 'teacher';
        req.body.country='teacher.country';
        const result = await discussionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})


// get discussion by org id
discussionService.get('/get-all', async (req, res) => {
    try {
        const { pageno, limit } = req.query;
        const result = await discussionUtil.read(parseInt(pageno), parseInt(limit));
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = discussionService;