const express = require('express');
const batchController = require('../controllers/batchController');

const batchRoute = express();

// POST route /create batch 
batchRoute.post('/', batchController.create);

// get all batch 
batchRoute.get('/', batchController.read);

// update batch 
batchRoute.put('/:id', batchController.update);

// delete batch 
batchRoute.delete('/:id', batchController.delete);

module.exports = batchRoute;