const express = require('express');
const organizationController = require('../controllers/organizationController');

const organizationRoute = express();

// POST route / Create a organization
organizationRoute.post('/', organizationController.create);
organizationRoute.get('/', organizationController.read);
organizationRoute.put('/:id', organizationController.update);
organizationRoute.delete('/:id', organizationController.delete);

module.exports = organizationRoute;

