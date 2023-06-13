const appliedStudentsUtils = require('../../utils/appliedStudents');
const organizationUtil = require('../../utils/organization');

const instituteService = require('express').Router();

// get all institute
instituteService.get('/getall', async (req, res) => {
    try {
        const { s, location, mode } = req.query;
        const result = await organizationUtil.searchInstitute(mode, location, s);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// apply institute
instituteService.post('/apply', async (req, res) => {
    try {
        const applyData = req.body;
        applyData.studentId = req.decoded.id;
        const result = await appliedStudentsUtils.create(applyData);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get applied institutes by student
instituteService.get('/applied-institutes', async (req, res) => {
    try {
        const studentId = req.decoded.id;
        const result = await appliedStudentsUtils.appliedInstitutes(studentId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = instituteService;