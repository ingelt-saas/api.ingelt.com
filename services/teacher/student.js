const express = require('express');
const studentService = express.Router();
const studentUtil = require('../../utils/student');
const mockTestMarksUtil = require('../../utils/mockTestMarks');
const teacherUtil = require('../../utils/teacher');

// get all student under by teacher 
studentService.get('/getAll', async (req, res) => {
    try {
        let pageNo = req.query.pageno;
        let limit = req.query.limit;

        if (pageNo) {
            pageNo = parseInt(pageNo);
        }

        if (limit) {
            limit = parseInt(limit);
        }

        const teacher = await teacherUtil.readById(req.decoded.id);
        const result = await studentUtil.readByOrg(teacher?.organization.id, pageNo, limit);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// search student by teacher id 
studentService.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.s;
        const teacherId = req.decoded.id;
        const result = await studentUtil.search(teacherId, searchQuery);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
})

// get a student by student id
studentService.get('/:studentId', async (req, res) => {
    try {
        const student = await studentUtil.readById(req.params.studentId);
        res.status(201).json(student);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get students by per batch
studentService.get('/batch/:batchId', async (req, res) => {
    try {
        const students = await studentUtil.getStudentsByBatch(req.params.batchId);
        res.status(201).json(students);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get band score by student id 
studentService.get('/bandScore/:studentId', async (req, res) => {
    try {
        const score = await studentUtil.bandScore(req.params.studentId);
        res.status(201).json(score);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get mock test marks
studentService.get('/mockTestMarks/:studentId', async (req, res) => {
    try {
        const testMarks = await mockTestMarksUtil.getMockTestMarksByStudent(req.params.studentId);
        res.status(201).json(testMarks);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = studentService;