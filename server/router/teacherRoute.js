const express = require('express');
const teacherController = require('../controllers/teacherController');

const teacherRoute = express();

// POST route / Create a organization

// create teacher 
teacherRoute.post('/', teacherController.create);

// get all teacher by batch 
teacherRoute.get('/batch/:id', teacherController.getTeachersByBatch);


// batchRoute.put('/:id', batchController.update);
// batchRoute.delete('/:id', batchController.delete);

module.exports = teacherRoute;