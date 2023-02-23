const express = require('express');
const organizationController = require('../controllers/organizationController');

const organizationRoute = express();

// POST route / Create a organization
organizationRoute.post('/', organizationController.create);

// get all organization
organizationRoute.get('/', organizationController.read);

// update organization
organizationRoute.put('/:id', organizationController.update);

// delete organization
organizationRoute.delete('/:id', organizationController.delete);

module.exports = organizationRoute;

