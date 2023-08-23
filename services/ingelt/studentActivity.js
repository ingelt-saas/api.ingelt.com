const studentActivityUtil = require('../../utils/studentActivity');

const studentActivityService = require('express').Router();

// getall active students
studentActivityService.get('/getStudentsActivity', async (req, res) => {
    try {
        const { year, month } = req.query;
        const result = await studentActivityUtil.getStudentActivity(year, month);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get students by date
studentActivityService.get('/getStudentsByDate', async (req, res) => {
    try {
        const { date } = req.query;
        const result = await studentActivityUtil.getStudentsByDate(date);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

//  get activities by student id and year and month
studentActivityService.get('/getActivities/:studentId', async (req, res) => {
    try {
        const { year, month } = req.query;
        const result = await studentActivityUtil.getActivitiesByStudent(req.params.studentId, year, month);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = studentActivityService;