const sessionUtil = require('../../utils/session');

const sessionService = require('express').Router();

// create a session
sessionService.post('/', async (req, res) => {
    try {
        const result = await sessionUtil.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


// get all sessions
sessionService.get('/getall', async (req, res) => {
    try {
        const result = await sessionUtil.getSessions();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update session
sessionService.put('/:sessionId', async (req, res) => {
    try {
        const result = await sessionUtil.update(req.params.sessionId, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete session
sessionService.delete('/:sessionId', async (req, res) => {
    try {
        await sessionUtil.delete(req.params.sessionId);
        res.status(208).send({ message: 'DELETED' });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = sessionService;