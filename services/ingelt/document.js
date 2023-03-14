const express = require("express");
const documentUtil = require("../../utils/document");
const documentService = express.Router();

// create new document 
documentService.post("/", async (req, res) => {
    try {
        const result = await documentUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a document by document id  
documentService.get("/:documentId", async (req, res) => {
    try {
        const result = await documentUtil.readById(req.params.documentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all document by org id 
documentService.get("/organization/:orgId", async (req, res) => {
    try {
        const result = await documentUtil.getDocsByOrg(req.params.orgId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete document
documentService.delete("/:documentId", async (req, res) => {
    try {
        const result = await documentUtil.delete(req.params.documentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = documentService;
