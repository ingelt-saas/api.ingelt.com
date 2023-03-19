const express = require("express");
const router = express.Router();

// Admin Service Import
const homeService = require("./home");
const documentService = require("./document");
const studentService = require("./student");
const teacherService = require("./teacher");
const batchService = require("./batch");
const mockTestService = require("./mockTest");

router.use("/", homeService);
router.use("/document", documentService);
router.use("/student", studentService);
router.use("/teacher", teacherService);
router.use("/batch", batchService);
router.use("/mockTest", mockTestService);

module.exports = router;
