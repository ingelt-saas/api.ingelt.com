const express = require('express');
const mockTestService = express.Router();
const mockTestUtil = require('../../utils/mockTest');
const mockTestMarksUtil = require('../../utils/mockTestMarks');

// add new mock test
mockTestService.post('/', async (req, res) => {
    try {
        const teacherId = req.decoded.id;// Assuming orgId is provided in the request body
        req.body.teacherId = teacherId;
        //set orgId attribute
        console.log(req.body);
      const result = await mockTestUtil.create(req.body);
      res.status(201).json(result);
    } catch (err) {
        console.log(err);
      res.status(400).send(err);
    }
  });

// get mock test by teacher id 
mockTestService.get('/:orgId', async (req, res) => {
    try {
        const teacherId = req.decoded.id;
        const orgId = req.params.orgId;
        const result = await mockTestUtil.getMockTestsByTeaAndOrg(orgId, teacherId);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get mock test by batch and teacher
mockTestService.get('/batch/:batchId', async (req, res) => {
    try {
        const teacherId = req.decoded.id;
        const result = await mockTestUtil.getMockTestsByTeaAndBatch(teacherId, req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// search mock test marks by student 
mockTestService.get('/search/:mockTestId', async (req, res) => {
    try {
        const mockTestId = req.params.mockTestId;
        const orgId = req.headers.organizationid;
        const { s, pageno, limit } = req.query;
        const searchData = {
            pageNo: parseInt(pageno),
            limit: parseInt(limit),
            searchQuery: s,
            orgId: orgId,
            mockTestId: mockTestId,
        };
        const result = await mockTestMarksUtil.searchByStudent(searchData);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// save mock test marks
mockTestService.post('/mockTestMarks', async (req, res) => {
    try {
        const newMarks = req.body;
        const result = await mockTestMarksUtil.create(newMarks);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update mock test marks
mockTestService.put('/mockTestMarks/:mockTestId', async (req, res) => {
    try {
        const updateData = req.body;
        const result = await mockTestMarksUtil.update(req.params.mockTestId, updateData);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all student in the organization with mock test marks by mock test 
mockTestService.get('/mockTestMarks/:mockTestId', async (req, res) => {
    try {
        const orgId = req.headers.organizationid;
        const { pageno, limit } = req.query;
        const marks = await mockTestMarksUtil.getTestMarksWithStudent(req.params.mockTestId, orgId, parseInt(pageno), parseInt(limit));
        res.status(200).json(marks);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = mockTestService;