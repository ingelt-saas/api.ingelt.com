const organizationUtil = require('../../utils/organization');

const instituteService = require('express').Router();

// get all institute
instituteService.get('/getall', async (req, res) => {
    try {
        const { s, location, mode } = req.query;
        const result = await organizationUtil.read();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = instituteService;