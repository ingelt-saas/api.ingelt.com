const express = require("express");
const router = express.Router();

// Student Services Import
const homeService = require("./home");
const discussionsService = require("./discussions");
const assignmentsService = require("./assignments");
const libraryService = require("./library");
const submissionService = require("./submission");
const settingsService = require("./settings");
const notesService = require("./notes");
const { authenticateStudent, studentEmailCheck, authorizationStudent } = require("../../auth/student");
const verifyJWT = require("../../middleware/verifyJWT");
const file = require("../../aws/file");
const { resetEmail, resetTokenVerify, passwordUpdate, } = require("./resetPassword");
const moduleService = require("./modules");
const instituteService = require("./institute");
const universityService = require("./university");


// authentication route
router.post("/auth", authenticateStudent);
router.post("/auth/emailCheck", studentEmailCheck);
router.post("/auth/signup", authorizationStudent);
router.post('/auth/resetEmail', resetEmail);
router.post('/auth/resetTokenVerify', resetTokenVerify);
router.post('/auth/passwordUpdate', passwordUpdate);

// get document
router.get('/files', async (req, res) => {
    try {
        const key = req.headers.awskey;
        const result = await file(key);
        res.send(result);
    } catch (err) { res.send('') }
});

// Student Services Router
router.use("/", verifyJWT, homeService);
router.use("/assignment", verifyJWT, assignmentsService);
router.use("/library", verifyJWT, libraryService);
router.use("/submission", verifyJWT, submissionService);
router.use("/notes", verifyJWT, notesService);
router.use("/discussion", verifyJWT, discussionsService);
router.use("/settings", verifyJWT, settingsService);
router.use("/modules", verifyJWT, moduleService);
router.use("/institute", verifyJWT, instituteService);
router.use("/university", verifyJWT, universityService);


module.exports = router;
