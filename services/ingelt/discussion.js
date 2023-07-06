const express = require("express");
const discussionUtil = require("../../utils/discussion");
const discussionReportUtil = require("../../utils/discussionReport");
const discussionService = express.Router();

// create new discussion 
discussionService.post("/", async (req, res) => {
    try {
        const result = await discussionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all
discussionService.get('/getall', async (req, res) => {
    try {
        const { pageNo, limit } = req.query;
        const result = await discussionUtil.read(parseInt(pageNo), parseInt(limit));
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get discussion reports
discussionService.get('/reports/:discussionId', async (req, res) => {
    try {
        const result = await discussionReportUtil.getReportsByDiscussion(req.params.discussionId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
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

// get discussion by batch id  
discussionService.get("/batch/:batchId", async (req, res) => {
    try {
        const result = await discussionUtil.getDiscussionsByBatch(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update discussion
discussionService.put("/:discussionId", async (req, res) => {
    try {
        const result = await discussionUtil.update(req.params.discussionId, req.body);
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
