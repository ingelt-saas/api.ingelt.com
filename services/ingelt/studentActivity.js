const studentActivityUtil = require('../../utils/studentActivity');

const studentActivityService = require('express').Router();

// getall active students
studentActivityService.get('/getActiveStudents', async (req, res) => {
    try {
        const { year, month } = req.query;
        const result = await studentActivityUtil.getActiveStudents(year, month);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = studentActivityService;