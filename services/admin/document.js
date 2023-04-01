const express = require("express");
const jwt = require("jsonwebtoken");
const documentUtil = require("../../utils/document");
const documentService = express.Router();

// add new document
documentService.post("/", async (req, res) => {
  try {
    const result = await documentUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all documents by organization
documentService.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const admin = jwt.decode(token);
    const organizationId = admin.organizationId;

    const result = await documentUtil.getDocsByOrg(organizationId);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = documentService;
