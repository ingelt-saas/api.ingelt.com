const multer = require('multer');
const { memoryStorage } = require('multer');
const express = require("express");
const libraryUtil = require("../../utils/library");
const libraryService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');

// add new files in library
libraryService.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    awsUpload(file, "ingelt/library", async (err, data) => {
      if (err) {
        return res.status(500).json({
          error: err.message,
        });
      } else {
        const newFile = req.body;
        newFile.name = file.originalname;
        newFile.file = data.Key;
        newFile.fileSize = file.size;
        const result = await libraryUtil.create(newFile);
        return res.status(201).json(result);
      }
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

// GET all items in library
libraryService.get("/get-all", async (req, res) => {
  try {
    const { pageno, limit } = req.query;
    const items = await libraryUtil.read(parseInt(pageno), parseInt(limit));
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// search items in library
libraryService.get("/search", async (req, res) => {
  try {
    const { s, pageno, limit } = req.query;
    const items = await libraryUtil.search(s, parseInt(pageno), parseInt(limit));
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// delete item from library
libraryService.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await libraryUtil.readById(id);
    if (item) { 
      deleteFile(item.file);
      await libraryUtil.delete(id);
      return res.status(200).json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = libraryService;
