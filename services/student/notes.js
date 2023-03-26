const express = require("express");
const jwt = require("jsonwebtoken");
const notesUtil = require("../../utils/notes");
const notesService = express.Router();

// get notes by batch id
notesService.get("/all", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const batchId = jwt.decode(token).batchId;

    const result = await notesUtil.getNotesByBatch(batchId);
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
