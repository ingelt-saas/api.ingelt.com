const studentFeedbackUtils = require('../../utils/studentFeedback');

const studentFeedbackService = require('express').Router();

// insert route
studentFeedbackService.post('/', async (req, res) => {
    try {
        const result = await studentFeedbackUtils.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all
studentFeedbackService.get('/getAll', async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        const result = await studentFeedbackUtils.getAll(parseInt(page), parseInt(limit), search);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get by id
studentFeedbackService.get('/getOne/:feedbackId', async (req, res) => {
    try {
        const result = await studentFeedbackUtils.getById(req.params.feedbackId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = studentFeedbackService;