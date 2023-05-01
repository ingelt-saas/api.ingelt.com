const express = require('express');
const discussionService = express.Router();
const discussionUtil = require('../../utils/discussion');

// create new discussion message
discussionService.post('/', async (req, res) => {
    try {
        const teacher = req.decoded;
        req.body.senderId = teacher.id;
        req.body.senderName = teacher.name;
        req.body.senderImage = teacher.image;
        req.body.designation = 'teacher';
        const result = await discussionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

// get discussion by org id
discussionService.get('/organization', async (req, res) => {
    try {
        const orgId = req.headers.orgid;
        const result = await discussionUtil.getDiscussionsByOrg(orgId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = discussionService;