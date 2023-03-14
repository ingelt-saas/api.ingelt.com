const express = require("express");
const assignmentUtil = require("../../utils/assignment");
const assignmentService = express.Router();

// create new assignment
assignmentService.post("/", async (req, res) => {
    try {
        const result = await assignmentUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all assignment
assignmentService.get("/", async (req, res) => {
    try {
        const result = await assignmentUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a assignment by assignment id
assignmentService.get("/:assignmentId", async (req, res) => {
    try {
        const result = await assignmentUtil.readById(req.params.assignmentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update assignment
assignmentService.put("/:assignmentId", async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const updateData = req.body;
    try {
        const result = await assignmentUtil.update(assignmentId, updateData);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete assignment
assignmentService.put("/:assignmentId", async (req, res) => {
    const assignmentId = req.params.assignmentId;
    try {
        const result = await assignmentUtil.delete(assignmentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = assignmentService;