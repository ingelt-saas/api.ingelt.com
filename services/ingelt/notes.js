const express = require("express");
const notesUtil = require("../../utils/notes");
const notesService = express.Router();

// create new notes
notesService.post("/", async (req, res) => {
    try {
        const result = await notesUtil.createNotes(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

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

// delete notes
notesService.delete("/:notesId", async (req, res) => {
    try {
        const result = await notesUtil.deleteNotes(req.params.notesId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = notesService;
