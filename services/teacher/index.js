const express = require("express");
const router = express.Router();

// Teacher Service Import
const homeService = require("./home");
const discussionService = require("./discussion");
const assignmentService = require("./assignment");
const mockTestService = require("./mockTest");
const notesService = require("./notes");
const libraryService = require("./library");
const settingService = require("./setting");
const studentService = require("./student");
const submissionService = require("./submission");

router.use("/", homeService);
router.use("/discussion", discussionService);
router.use("/assignment", assignmentService);
router.use("/mockTest", mockTestService);
router.use("/notes", notesService);
router.use("/library", libraryService);
router.use("/setting", settingService);
router.use("/student", studentService);
router.use("/submission", submissionService);

module.exports = router;
