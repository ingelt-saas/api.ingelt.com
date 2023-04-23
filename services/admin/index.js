const express = require("express");
const router = express.Router();

// Admin Service Import
const homeService = require("./home");
const studentService = require("./student");
const teacherService = require("./teacher");
const libraryService = require("./library");
const batchService = require("./batch");
const mockTestService = require("./mockTest");
const settingsService = require("./settings");

router.use("/", homeService);
router.use("/student", studentService);
router.use("/teacher", teacherService);
router.use("/library", libraryService);
router.use("/batch", batchService);
router.use("/mockTest", mockTestService);
router.use("/assignment", mockTestService);
router.use("/settings", settingsService);

module.exports = router;
