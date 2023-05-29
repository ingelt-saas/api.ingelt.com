const discussionUtil = require('../../utils/discussion');

const discussionService = require('express').Router();

// get all discussion service 
discussionService.get('/getall', async (req, res) => {
    try {
        const { pageNo, limit } = req.query;
        const result = await discussionUtil.read(parseInt(pageNo), parseInt(limit));
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = discussionService;