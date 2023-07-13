const eventUtil = require('../../utils/event');

const eventService = require('express').Router();

// create
eventService.post('/', async (req, res) => {
    try {
        const result = await eventUtil.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// read 
eventService.get('/getall', async (req, res) => {
    try {
        const { pageNo, limit, s } = req.query;
        const result = await eventUtil.read(parseInt(pageNo), parseInt(limit), s);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update
eventService.put('/:eventId', async (req, res) => {
    try {
        const result = await eventUtil.update(req.params.eventId, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete
eventService.delete('/:eventId', async (req, res) => {
    try {
        const result = await eventUtil.delete(req.params.eventId);
        res.status(208).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = eventService;