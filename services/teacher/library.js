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

// search items in library
libraryService.get("/search", async (req, res) => {
  try {
    const { s, pageno, limit } = req.query;
    const items = await libraryUtil.search(s, parseInt(pageno), parseInt(limit));
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = libraryService;
