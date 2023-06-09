const moduleUtil = require('../../utils/modules');

const moduleService = require('express').Router();

// get modules
moduleService.get('/getall', async (req, res) => {
    try {
        const { s, pageNo, limit, subject } = req.query;
        const result = await moduleUtil.getModules(parseInt(pageNo), parseInt(limit), subject, s);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = moduleService;