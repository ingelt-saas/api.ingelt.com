const express = require('express');
const teacherController = require('../controllers/teacherController');

const teacherRoute = express();

// POST route / Create a organization

// create teacher 
teacherRoute.post('/', teacherController.create);

// get all teacher by batch 
teacherRoute.get('/batch/:id', teacherController.getTeachersByBatch);

// update teacher 
teacherRoute.put('/:id', teacherController.update);

// delete teacher 
teacherRoute.delete('/:id', teacherController.delete);

module.exports = teacherRoute;