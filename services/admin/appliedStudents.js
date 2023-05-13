const appliedStudentsUtils = require('../../utils/appliedStudents');

const appliedStudentsService = require('express').Router();

// get all applied students
appliedStudentsService.get('/getall', async (req, res) => {
    try {
        const { pageno, limit } = req.query;
        const orgId = req.decoded.organizationId;
        const result = await appliedStudentsUtils.getAll(orgId, parseInt(pageno), parseInt(limit));
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// accept applied students
appliedStudentsService.put('/:studentId', async (req, res) => {
    try {
        const orgId = req.decoded.organizationId;
        const result = await appliedStudentsUtils.acceptStudent(orgId, req.params.studentId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = appliedStudentsService;