const express = require('express');
const submissionController = require('../controllers/submissionController');

const submissionRoute = express();


// POST route / Create a submission
submissionRoute.post('/', submissionController.create);

// get submission by per assignment or per student
submissionRoute.get('/:id', submissionController.getSubmissionByAssignOrStu);

// get submission by per assignment and per student
submissionRoute.get('/:assignmentId/:studentId', submissionController.getSubmissionByAssignAndStu);

// update submission by student 
submissionRoute.put('/:id', submissionController.updateSubmissionByStudent);

// delete submission
submissionRoute.delete('/:id', submissionController.delete);

module.exports = submissionRoute;