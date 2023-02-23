const express = require('express');
const assignmentController = require('../controllers/assignmentController');

const assignmentRoute = express();

// POST route / Create a assignment
assignmentRoute.post('/', assignmentController.create);

// get all assignment
assignmentRoute.get('/', assignmentController.read);

// update a assignment
assignmentRoute.put('/:id', assignmentController.update);

// delete a assignment
assignmentRoute.delete('/:id', assignmentController.delete);

module.exports = assignmentRoute;

