const express = require('express');
const studentController = require('../controllers/studentController');

const studentRoute = express();

// POST route / Create a organization
// batchRoute.post('/', batchController.create);

// get all students by batch 
studentRoute.get('/batch/:id', studentController.getStudentsByBatch);

// batchRoute.put('/:id', batchController.update);
// batchRoute.delete('/:id', batchController.delete);

module.exports = studentRoute;