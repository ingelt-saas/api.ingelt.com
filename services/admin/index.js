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
const authenticateAdmin = require("../../auth/admin");
const verifyJWT = require("../../middleware/verifyJWT");

router.use("/", verifyJWT, homeService);
router.use("/student", verifyJWT, studentService);
router.use("/teacher", verifyJWT, teacherService);
router.use("/library", verifyJWT, libraryService);
router.use("/batch", verifyJWT, batchService);
router.use("/mockTest", verifyJWT, mockTestService);
router.use("/assignment", verifyJWT, mockTestService);
router.use("/settings", verifyJWT, settingsService);

// authentication service 
router.post('/auth', authenticateAdmin);

module.exports = router;
