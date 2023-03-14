const express = require("express");
const mockTestUtil = require("../../utils/mockTest");
const mockTestService = express.Router();

// create new test 
mockTestService.post("/", async (req, res) => {
    try {
        const result = await mockTestUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a mock test by mocktest id  
mockTestService.get("/:id", async (req, res) => {
    try {
        const result = await mockTestUtil.readById(req.params.id);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all mock test by batch id  
mockTestService.get("/batch/:batchId", async (req, res) => {
    try {
        const result = await mockTestUtil.getMockTestsByBatch(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update mock test
mockTestService.put("/:id", async (req, res) => {
    try {
        const result = await mockTestUtil.update(req.params.id, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete mock test
mockTestService.delete("/:id", async (req, res) => {
    try {
        const result = await mockTestUtil.delete(req.params.id);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = mockTestService;
