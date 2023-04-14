const { memoryStorage } = require('multer');
const adminUtil = require('../../utils/admin');
const organizationUtil = require('../../utils/organization');
const multer = require('multer');
const settingsService = require('express').Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');

// update admin image 
settingsService.post('/', upload.single('image'), async (req, res) => {
    try {
        const adminId = req.decoded.id;
        const file = req.file;

        awsUpload(file, 'admin/profile', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const result = await adminUtil.update(adminId, { picture: data.Key });
                res.send(result);
            }
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

// update org logo 
settingsService.post('/org', upload.single('image'), async (req, res) => {
    try {
        const orgId = req.decoded.organizationId;
        const file = req.file;

        awsUpload(file, 'admin/organization', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const result = await organizationUtil.update(orgId, { logo: data.Key });
                res.send(result);
            }
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

// update profile 
settingsService.put('/', async (req, res) => {
    try {
        const updatedData = req.body;
        const adminId = req.decoded.id;

        const result = await adminUtil.update(adminId, updatedData);
        res.send(result);

    } catch (err) {
        res.status(400).send(err);
    }
});

// update org data 
settingsService.put('/org', async (req, res) => {
    try {
        const updatedData = req.body;
        const orgId = req.decoded.organizationId;

        const result = await organizationUtil.update(orgId, updatedData);
        res.send(result);

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = settingsService;