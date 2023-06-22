const blogUtil = require('../../utils/blog');

const blogService = require('express').Router();

// get blogs
blogService.get('/', async (req, res) => {
    try {
        const result = await blogUtil.readForStudent();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = blogService;