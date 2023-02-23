const express = require('express');
const adminController = require('../controllers/adminController');

const adminRoute = express();

// POST route / Create a admin
adminRoute.post('/', adminController.create);

// get all admin
adminRoute.get('/', adminController.read);

// update a admin
adminRoute.put('/:id', adminController.update);

// delete a admin
adminRoute.delete('/:id', adminController.delete);

module.exports = adminRoute;

