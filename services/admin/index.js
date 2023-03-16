const express = require("express");
const router = express.Router();

// Admin Service Import
const homeService = require('./home');
const studentService = require('./student');
const teacherService = require('./teacher');
const batchService = require('./batch');

// Home Route 
router.use('/', homeService);

// Student Route
router.use('/student', studentService);

// Teacher Route 
router.use('/teacher', teacherService);

// Batch Route 
router.use('/batch', batchService);

module.exports = router;