const express = require('express');
const docController = require('../controllers/docController');

const docRoute = express();

// POST route / Create a doc
docRoute.post('/', docController.create);

// get all docs by organization 
docRoute.get('/organization/:id', docController.getDocsByOrg);

// update doc
docRoute.put('/:id', docController.update);

// delete doc
docRoute.delete('/:id', docController.delete);

module.exports = docRoute;