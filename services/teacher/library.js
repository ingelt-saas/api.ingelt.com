const express = require("express");
const libraryUtil = require("../../utils/library");
const libraryService = express.Router();

// GET all items in library
libraryService.get("/get-all", async (req, res) => {
  try {
    const { s, pageNo, limit } = req.query;
    const items = await libraryUtil.read(parseInt(pageNo), parseInt(limit), s);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = libraryService;
