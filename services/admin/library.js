const express = require("express");
const libraryUtil = require("../../utils/library");
const libraryService = express.Router();

// GET all items in library
libraryService.get("/", async (req, res) => {
  try {
    const items = await libraryUtil.read();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = libraryService;
