const multer = require('multer');
const { memoryStorage } = require('multer');

const universityService = require('express').Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');
const universityUtil = require('../../utils/university');

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
        const result = await universityUtil.create(newUniversity);
        res.status(201).send(result);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

// get all universities
universityService.get('/getall', async (req, res) => {
    try {
        const { s, pageNo, limit } = req.query;
        const result = await universityUtil.read(parseInt(pageNo), parseInt(limit));
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// read one university
universityService.get('/:universityId', async (req, res) => {
    try {
        const result = await universityUtil.readyById(req.params.universityId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update university
universityService.put('/:universityId', upload.single('logo'), async (req, res) => {
    try {

        const universityId = req.params.universityId;
        const updateUniversity = req.body;
        const logo = req.file;

        const getUniversity = await universityUtil.readyById(universityId);

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
            updateUniversity.logo = uploadedLogo.Key;
            getUniversity.logo && await deleteFile(getUniversity.logo);
        }

        const result = await universityUtil.update(universityId, updateUniversity);
        res.status(200).json(result);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

// delete university
universityService.delete('/:universityId', async (req, res) => {
    try {
        const getUniversity = await universityUtil.readyById(req.params.universityId);
        getUniversity.logo && await deleteFile(getUniversity.logo); // delete university logo
        const result = await universityUtil.delete(req.params.universityId);
        res.status(202).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = universityService;