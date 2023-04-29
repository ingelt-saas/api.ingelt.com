const express = require("express");
const organizationUtil = require("../../utils/organization");
const { memoryStorage } = require("multer");
const multer = require("multer");
const organizationService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const orgImagesUtils = require("../../utils/orgImages");

// create new organization 
organizationService.post("/",
    upload.fields([{ name: 'orgImages', maxCount: 5 }, { name: 'logo' }, { name: 'panPicture' }]),
    async (req, res) => {

        const uploadFileToS3 = (file, filepath) => new Promise((resolve, reject) => {
            awsUpload(file, filepath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        try {
            const newInstitute = req.body;
            const logo = req.files.logo[0]; // institute logo
            const panPicture = req.files.panPicture[0]; // institute pan picture
            const orgImages = req.files.orgImages; // institute images

            const uploadLogo = await uploadFileToS3(logo, 'institute'); // upload to aws
            newInstitute.logo = uploadLogo.Key; // set key in newInstitute object

            const uploadPanPic = await uploadFileToS3(panPicture, 'institute'); // upload to aws
            newInstitute.panPicture = uploadPanPic.Key; // set key in newInstitute object

            let uploadOrgImages = await uploadFileToS3(orgImages, 'institute'); // upload to aws 

            let result = await organizationUtil.create(newInstitute); // insert new institute

            uploadOrgImages = uploadOrgImages.map(i => ({ name: i.Key, organizationId: result.id }));

            result = await orgImagesUtils.create(uploadOrgImages); // insert institute images

            res.status(201).json(result);
        } catch (err) {
            res.status(400).json(err);
        }
    });

// get all organization 
organizationService.get("/", async (req, res) => {
    try {
        const result = await organizationUtil.read();
        res.status(200).send(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// apply organization 
organizationService.post('/apply', async (req, res) => {
    try {
        const result = await organizationUtil.apply(req.body);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// search organizations
organizationService.get('/search', async (req, res) => {
    try {
        const searchQuery = req.query.search;
        const result = await organizationUtil.search(searchQuery);
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get a organization by organization id  
organizationService.get("/:orgId", async (req, res) => {
    try {
        const result = await organizationUtil.readById(req.params.orgId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update organization
organizationService.put("/:orgId", async (req, res) => {
    try {
        const result = await organizationUtil.update(req.params.orgId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete organization
organizationService.delete("/:orgId", async (req, res) => {
    try {
        const result = await organizationUtil.delete(req.params.orgId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = organizationService;
