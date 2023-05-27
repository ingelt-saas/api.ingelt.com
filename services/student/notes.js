const express = require("express");
const jwt = require("jsonwebtoken");
const notesUtil = require("../../utils/notes");
const studentUtil = require("../../utils/student");
const notesService = express.Router();

// get notes by batch id
notesService.get("/getall", async (req, res) => {
  try {

    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;

    const result = await notesUtil.getNotesByOrg(orgId, parseInt(pageNo), parseInt(limit), s);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get notes by batch id
notesService.get("/search", async (req, res) => {
  try {

    const studentId = req.decoded.id;
    const student = await studentUtil.readById(studentId);
    const { s, pageno, limit } = req.query;

    const result = await notesUtil.search(student?.organization?.id, s, parseInt(pageno), parseInt(limit));
    res.status(200).json(result);
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
