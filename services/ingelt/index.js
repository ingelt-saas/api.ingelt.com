const express = require("express");
const router = express.Router();

// InGelt Services Import
const studentService = require("./student");

// InGelt Services Router
router.use("/student", studentService);

module.exports = router;
