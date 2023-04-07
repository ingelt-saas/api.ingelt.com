const express = require("express");
const jwt = require("jsonwebtoken");
const documentUtil = require("../../utils/document");
const { memoryStorage } = require("multer");
const multer = require("multer");
const documentService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');


// add new document
documentService.post("/", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const subject = req.body.subject;

    awsUpload(file, 'admin/documents', async (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const result = await documentUtil.create({ file: data.Key, fileSize: file.size, subject });
        res.status(201).json(result);
      }
    });
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
