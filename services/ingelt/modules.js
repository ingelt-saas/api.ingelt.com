const moduleUtil = require('../../utils/modules');
const moduleService = require('express').Router();
const deleteFile = require('../../aws/delete');
const { memoryStorage } = require('multer');
const multer = require('multer');
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');

// create modules
moduleService.post('/', upload.fields([{ name: 'file' }, { name: 'thumbnail' }]), async (req, res) => {
    try {
        const moduleVideo = req.files.file[0];
        const thumbnail = req.files.thumbnail[0];

        const fileUpload = (file, filePath) => new Promise((resolve, reject) => {
            awsUpload(file, filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            });
        });

        const uploadedModule = await fileUpload(moduleVideo, 'ingelt/modules/videos');
        const uploadedThumbnail = await fileUpload(thumbnail, 'ingetl/modules/thumbnails');

        const newModule = req.body;
        newModule.name = moduleVideo.originalname;
        newModule.file = uploadedModule.Key;
        newModule.fileSize = moduleVideo.size;
        newModule.thumbnail = uploadedThumbnail.Key;
        const result = await moduleUtil.create(newModule);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// get modules
moduleService.get('/getall', async (req, res) => {
    try {
        const { s, pageNo, limit, subject } = req.query;
        const result = await moduleUtil.getModules(parseInt(pageNo), parseInt(limit), subject, s);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// delete modules
moduleService.delete('/:moduleId', async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        const getModule = await moduleUtil.readById(moduleId);

        // delete from cloud
        getModule.file && await deleteFile(getModule.file);
        getModule.thumbnail && await deleteFile(getModule.thumbnail);

        const result = await moduleUtil.delete(moduleId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = moduleService;