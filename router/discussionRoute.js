const express = require('express');
const discussionController = require('../controllers/discussionController');

const discussionRoute = express();


// POST route / Create a discussion
discussionRoute.post('/', discussionController.create);

// get discussion by batch id and sender id
discussionRoute.get('/:id', discussionController.getDiscussionByBatchOrSender);

// update discussion
discussionRoute.put('/:id', discussionController.update);

// delete discussion
discussionRoute.delete('/:id', discussionController.delete);

module.exports = discussionRoute;