// Modules
const router = require("express").Router();

const adminAuth = require("./admin");
const teacherAuth = require("./teacher");
const { authenticateStudent, studentEmailCheck, authorizationStudent } = require("./student");

router.post("/admin", adminAuth);
router.post("/teacher", teacherAuth);
router.post("/student/login", authenticateStudent);
router.post("/student/signup", authorizationStudent);
router.post("/student/email-check", studentEmailCheck);

module.exports = router;
