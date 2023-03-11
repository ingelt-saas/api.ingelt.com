const express = require("express");
const notesUtil = require("../../utils/notes");
const notesService = express.Router();

// get documents by organization id
notesService.get("/batch/:id", notesUtil.getNotesByBatch);

// get document by id
notesService.get("/:id", notesUtil.readById);

module.exports = notesService;
