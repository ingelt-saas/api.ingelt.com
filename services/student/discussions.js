const express = require("express");
const discussionUtil = require("../../utils/discussion");
const discussionService = express.Router();

// POST discussion
discussionService.post("/", discussionUtil.create);

// get all discussions by batch id
discussionService.get("/batch/:id", discussionUtil.getDiscussionsByBatch);

// get discussion by id
discussionService.get("/:id", discussionUtil.readById);

// delete discussion
discussionService.delete("/:id", discussionUtil.delete);

module.exports = discussionService;
