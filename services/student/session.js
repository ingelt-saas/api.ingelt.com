const sessionUtil = require('../../utils/session');

const sessionService = require('express').Router();

// create
sessionService.post('/', async (req, res) => {
    try {
        req.body.studentId = req.decoded.id;
        const result = await sessionUtil.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// read 
sessionService.get('/', async (req, res) => {
    try {
        const result = await sessionUtil.getByStudent(req.decoded.id);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = sessionService;