const express = require("express");
const documentsUtil = require("../../utils/document");
const documentsService = express.Router();

// get documents by organization id
documentsService.get("/batch/:id", documentsUtil.getDocsByOrg);

// get document by id
documentsService.get("/:id", documentsUtil.readById);

module.exports = documentsService;
