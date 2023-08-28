const moduleTrackingUtil = require('../../utils/moduleTracking');

const moduleTrackingService = require('express').Router();

// create
moduleTrackingService.post('/', async (req, res) => {
    try {
        const student = req.decoded;
        req.body.studentId = student.id;
        const result = await moduleTrackingUtil.create(req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update
moduleTrackingService.put('/:id', async (req, res) => {
    try {
        const result = await moduleTrackingUtil.update(req.params.id, req.body);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = moduleTrackingService;