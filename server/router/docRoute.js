const express = require('express');
const docController = require('../controllers/docController');

const docRoute = express();

// POST route / Create a organization
// batchRoute.post('/', batchController.create);

// get all docs by organization 
docRoute.get('/organization/:id', docController.getDocsByOrg);

// batchRoute.put('/:id', batchController.update);
// batchRoute.delete('/:id', batchController.delete);

module.exports = docRoute;