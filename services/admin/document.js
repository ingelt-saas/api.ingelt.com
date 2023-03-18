const express = require('express');
const documentUtil = require('../../utils/document');
const documentService = express.Router();

// add new document
documentService.post('/', async (req, res) => {
    try {
        const result = await documentUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all documents
documentService.get('/', async (req, res) => {
    try {
        const result = await documentUtil.read();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = documentService;