const express = require("express");
const router = express.Router();

// Student Services Import
const homeService = require("./home");
const discussionsService = require("./discussions");
const assignmentsService = require("./assignments");
const submissionService = require("./submission");
const documentsService = require("./documents");
const settingsService = require("./settings");
const notesService = require("./notes");

// Student Services Router
router.use("/", homeService);
router.use("/assignment", assignmentsService);
router.use("/submission", submissionService);
router.use("/notes", notesService);
router.use("/document", documentsService);
router.use("/discussion", discussionsService);
router.use("/settings", settingsService);

module.exports = router;
