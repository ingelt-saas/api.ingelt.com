const express = require("express");
const discussionUtil = require("../../utils/discussion");
const discussionService = express.Router();

// POST discussion
discussionService.post("/", async (req, res) => {
    try {
        const result = await discussionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all discussions by batch id
discussionService.get("/batch/:batchId", async (req, res) => {
    try {
        const result = await discussionUtil.getDiscussionsByBatch(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get discussion by  id
discussionService.get("/:discussionId", async (req, res) => {
    try {
        const result = await discussionUtil.readById(req.params.discussionId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete discussion
discussionService.delete("/:discussionId", async (req, res) => {
    try {
        const result = await discussionUtil.delete(req.params.discussionId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = discussionService;
