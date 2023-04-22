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

// GET an item by id
libraryService.get("/:id", async (req, res) => {
  try {
    const item = await libraryUtil.readById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new item to library
libraryService.post("/", async (req, res) => {
  try {
    const newItem = await libraryUtil.create(req.body);
    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE an item from library
libraryService.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await libraryUtil.delete(req.params.id);
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = libraryService;
