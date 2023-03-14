const express = require("express");
const testMarksUtil = require("../../utils/mockTestMarks");
const testMarksService = express.Router();

// create new test marks 
testMarksService.post("/", async (req, res) => {
    try {
        const result = await testMarksUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all marks by mocktest id 
testMarksService.get("/:mockId", async (req, res) => {
    try {
        const result = await testMarksUtil.getMockTestMarksByMockTest(req.params.mockId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update test marks
testMarksService.put("/:marksId", async (req, res) => {
    try {
        const result = await testMarksUtil.update(req.params.marksId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = testMarksService;
