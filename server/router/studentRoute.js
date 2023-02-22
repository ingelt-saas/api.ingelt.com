const express = require('express');
const studentController = require('../controllers/studentController');

const studentRoute = express();

// POST route / Create a student
studentRoute.post('/', studentController.create);

// get all students by batch 
studentRoute.get('/batch/:id', studentController.getStudentsByBatch);

// update student
studentRoute.put('/:id', studentController.update);

// delete student 
studentRoute.delete('/:id', studentController.delete);

module.exports = studentRoute;