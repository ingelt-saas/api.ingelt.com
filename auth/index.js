// Modules
const router = require("express").Router();

const adminAuth = require("./admin");
const teacherAuth = require("./teacher");
const { authenticateStudent, studentEmailCheck, authorizationStudent, studentResetEmailCheck, studentResetCodeVerify, studentResetPasswordUpdate } = require("./student");

router.post("/admin", adminAuth);
router.post("/teacher", teacherAuth);
router.post("/student/login", authenticateStudent);
router.post("/student/signup", authorizationStudent);
router.post("/student/email-check", studentEmailCheck);
router.post("/student/reset-email-check", studentResetEmailCheck);
router.post("/student/reset-email-verify", studentResetCodeVerify);
router.post("/student/reset-password-update", studentResetPasswordUpdate);

module.exports = router;
