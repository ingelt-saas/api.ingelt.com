// Modules
const router = require("express").Router();

const adminAuth = require("./admin");
const teacherAuth = require("./teacher");
const studentAuth = require("./student");

router.post("/admin", adminAuth);
router.post("/teacher", teacherAuth);
router.post("/student", studentAuth);

module.exports = router;
