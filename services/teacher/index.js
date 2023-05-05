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
const authenticateTeacher = require("../../auth/teacher");
const verifyJWT = require("../../middleware/verifyJWT");
const file = require("../../aws/file");

// authentication route
router.post("/auth", authenticateTeacher);

// file or image route 
router.get('/files', verifyJWT, async (req, res) => {
    try {
        const key = req.headers.awskey;
        const result = await file(key);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.use("/", verifyJWT, homeService);
router.use("/discussion", verifyJWT, discussionService);
router.use("/assignment", verifyJWT, assignmentService);
router.use("/mockTest", verifyJWT, mockTestService);
router.use("/notes", verifyJWT, notesService);
router.use("/library", verifyJWT, libraryService);
router.use("/settings", verifyJWT, settingService);
router.use("/student", verifyJWT, studentService);
router.use("/submission", verifyJWT, submissionService);

module.exports = router;
