const express = require("express");
const router = express.Router();

// Admin Service Import
const homeService = require('./home');
const documentService = require('./document');
const studentService = require('./student');
const teacherService = require('./teacher');
const batchService = require('./batch');
const mockTestService = require('./mockTest');

// Home Route 
router.use('/', homeService);

// Document Route 
router.use('/document', documentService);

// Student Route
router.use('/student', studentService);

// Teacher Route 
router.use('/teacher', teacherService);

// Batch Route 
router.use('/batch', batchService);

// Mock Test Route 
router.use('/mockTest', mockTestService);

module.exports = router;