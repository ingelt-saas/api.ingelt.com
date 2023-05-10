const { memoryStorage } = require('multer');
const adminUtil = require('../../utils/admin');
const organizationUtil = require('../../utils/organization');
const multer = require('multer');
const settingsService = require('express').Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');
const bcrypt = require('bcrypt');

// update admin image 
settingsService.post('/', upload.single('image'), async (req, res) => {
    try {
        const adminId = req.decoded.id;
        const file = req.file;
        const admin = await adminUtil.readById(adminId);

        awsUpload(file, 'admin/profile', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const result = await adminUtil.update(adminId, { picture: data.Key });
                admin?.picture && await deleteFile(admin.picture); // delete previous image
                res.json(result);
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
        const organization = await organizationUtil.readById(orgId);
        const file = req.file;

        awsUpload(file, 'admin/organization', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const result = await organizationUtil.update(orgId, { logo: data.Key });
                organization?.logo && await deleteFile(organization.logo); // delete previous logo
                res.json(result);
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

// update password 
settingsService.put('/updatePassword', async (req, res) => {
    try {
        const prevPwd = req.body.prevPassword;
        const admin = await adminUtil.readById(req.decoded.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        if (await bcrypt.compare(prevPwd, admin.password)) {
            const result = await adminUtil.update(req.decoded.id, { password: hashedPassword });
            res.json(result);
        } else {
            res.status(401).json({ message: 'Your previous password does not match.' });
        }
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
        res.json(result);

    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = settingsService;