const express = require('express');
const studentService = express.Router();
const studentUtil = require('../../utils/student');
const mockTestMarksUtil = require('../../utils/mockTestMarks');
const teacherUtil = require('../../utils/teacher');
const submissionUtil = require('../../utils/submission');

// get all student under by teacher 
studentService.get('/getall', async (req, res) => {
    try {
        const { s, pageNo, limit } = req.query;
        const orgId = req.decoded.organizationId;
        const result = await studentUtil.activeStudents(orgId, parseInt(pageNo), parseInt(limit), s);
        res.json(result);
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

// get submissions by student id
studentService.get('/submissions/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const result = await submissionUtil.getSubmissionByStudent(studentId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = studentService;