const express = require("express");
const router = express.Router();

// Student Services Import
const homeService = require("./home");
const discussionsService = require("./discussions");
const assignmentsService = require("./assignments");
const documentsService = require("./documents");
const settingsService = require("./settings");
const notesService = require("./notes");

// Student Services Services
router.use("/", homeService);
router.use("/discussions", discussionsService);
router.use("/assignments", assignmentsService);
router.use("/documents", documentsService);
router.use("/settings", settingsService);
router.use("/notes", notesService);

// Test Service
router.get("/test", (req, res) => {
  res.send("Student Services Test Service");
});

module.exports = router;
