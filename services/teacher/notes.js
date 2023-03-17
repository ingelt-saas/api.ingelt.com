const express = require('express');
const notesService = express.Router();
const notesUtil = require('../../utils/notes');

// add new notes
notesService.post('/', async (req, res) => {
    try {
        const result = await notesUtil.createNotes(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get notes by batch id
notesService.get('/batch/:batchId', async (req, res) => {
    try {
        const result = await notesUtil.getNotesByBatch(req.params.batchId);
        req.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = notesService;