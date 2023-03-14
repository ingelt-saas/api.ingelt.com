const express = require("express");
const notesUtil = require("../../utils/notes");
const notesService = express.Router();

// get notes by batch  id
notesService.get("/batch/:batchId", async (req, res) => {
    try {
        const result = await notesUtil.getNotesByBatch(req.params.batchId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a notes by notes id  
notesService.get("/:notesId", async (req, res) => {
    try {
        const result = await notesUtil.readById(req.params.notesId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = notesService;
