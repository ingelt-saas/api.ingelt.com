const express = require("express");
const batchUtil = require("../../utils/batch");
const batchService = express.Router();

// create new batch 
batchService.post("/", async (req, res) => {
    try {
        const result = await batchUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all batch 
batchService.get("/", async (req, res) => {
    try {
        const result = await batchUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a batch by batch id  
batchService.get("/:adminId", async (req, res) => {
    try {
        const result = await batchUtil.readById(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update batch
batchService.put("/:adminId", async (req, res) => {
    try {
        const result = await batchUtil.update(req.params.batchId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete batch
batchService.delete("/:adminId", async (req, res) => {
    try {
        const result = await batchUtil.delete(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = batchService;
