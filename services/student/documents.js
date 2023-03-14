const express = require("express");
const documentsUtil = require("../../utils/document");
const documentsService = express.Router();

// get documents by organization id
documentsService.get("/organization/:orgId", async (req, res) => {
    try {
        const result = await documentsUtil.getDocsByOrg(req.params.orgId);
        res.status(201).json(result);
    } catch (err) {
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
