const multer = require('multer');
const { memoryStorage } = require('multer');

const universityService = require('express').Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');

// create university
universityService.post('/', upload.single('logo'), async (req, res) => {
    try {
        const newUniversity = req.body;
        const logo = req.file;

        const __logoUpload = (file) => new Promise((resolve, reject) => {
            awsUpload(file, 'ingelt/universities', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        const uploadedLogo = logo ? await __logoUpload(logo) : null;
        if (uploadedLogo) {
            newUniversity.logo = uploadedLogo.Key
        }


    } catch (err) {
        res.status(400).send(err);
    }
});

// get all universities
universityService.get('/getall', async (req, res) => {
    try {
        const { s, pageNo, limit } = req.query;
    } catch (err) {
        res.status(400).send(err);
    }
});

// read one university
universityService.get('/:universityId', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).send(err);
    }
});

// update university
universityService.put(':universityId', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).send(err);
    }
});

// delete university
universityService.delete('/:universityId', async (req, res) => {
    try {
        // deleteFile(); // delete university logo
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = universityService;