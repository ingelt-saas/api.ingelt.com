const express = require('express');
const adminController = require('../controllers/adminController');

const adminRoute = express();

// POST route / Create a organization
adminRoute.post('/', adminController.create);
adminRoute.get('/', adminController.read);
adminRoute.put('/:id', adminController.update);
adminRoute.delete('/:id', adminController.delete);

module.exports = adminRoute;

