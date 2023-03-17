const express = require('express');
const documentService = express.Router();
const documentUtil = require('../../utils/document');

documentService.get('/', async (req, res) => {
    try {
        const result = await documentUtil.read();
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = documentService;