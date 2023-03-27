const express = require("express");
const jwt = require("jsonwebtoken");
const batchUtil = require("../../utils/batch");
const documentsUtil = require("../../utils/document");
const documentsService = express.Router();

// get documents by organization id
documentsService.get("/all", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const batchId = jwt.decode(token).batchId;
    const org = await batchUtil.readById(batchId);

    const result = await documentsUtil.getDocsByOrg(org.organizationId);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// get document by id
documentsService.get("/:documentId", async (req, res) => {
  try {
    const result = await documentsUtil.readById(req.params.documentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = documentsService;
