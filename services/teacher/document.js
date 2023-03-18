const express = require('express');
const documentUtil = require('../../utils/document');
const documentService = express.Router();

documentService.get('/allDocuments', async (req, res) => {
    try {
        const result = await documentUtil.read();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = documentService;