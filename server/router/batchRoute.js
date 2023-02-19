const express = require('express');
const batchController = require('../controllers/batchController');

const batchRoute = express();

// POST route / Create a organization
// batchRoute.post('/', batchController.create);
batchRoute.get('/', batchController.read);
// batchRoute.put('/:id', batchController.update);
// batchRoute.delete('/:id', batchController.delete);

module.exports = batchRoute;