const express = require("express");
const router = express.Router();

// Teacher Service Import
const homeService = require('./home');
const documentService = require('./document');
const discussionService = require('./discussion');
const assignmentService = require('./assignment');
const mockTestService = require('./mockTest');
const notesService = require('./notes');
const settingService = require('./setting');
const studentService = require('./student');
const submissionService = require('./submission');

// Home Route 
router.use('/', homeService);

// Document Route 
router.use('/document', documentService);

// Discussion Route 
router.use('/discussion', discussionService);

// Assignment Route 
router.use('/assignment', assignmentService);

// Mock Test Route 
router.use('/mockTest', mockTestService);

// Notes Route 
router.use('/notes', notesService);

// Setting Route 
router.use('/setting', settingService);

// Student Route 
router.use('/student', studentService);

// Submission Route 
router.use('/submission', submissionService);

module.exports = router;