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

        const newModule = req.body;
        const moduleVideo = req.files.file ? req.files.file[0] : null;
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

        if (moduleVideo) {
            const uploadedModule = await fileUpload(moduleVideo, 'ingelt/modules/videos');
            newModule.file = uploadedModule.Key;
            newModule.fileSize = moduleVideo.size;
        }

        const uploadedThumbnail = await fileUpload(thumbnail, 'ingelt/modules/thumbnails');
        newModule.thumbnail = uploadedThumbnail.Key;

        const result = await moduleUtil.create(newModule);
        res.status(201).json(result);
    } catch (err) {
        console.log(err)
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

// read by id
moduleService.get('/:moduleId', async (req, res) => {
    try {
        const result = await moduleUtil.readById(req.params.moduleId);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update modules 
moduleService.put('/:moduleId', upload.fields([{ name: 'file' }, { name: 'thumbnail' }]), async (req, res) => {
    try {

        const updateData = req.body;
        const getModule = await moduleUtil.readById();

        const moduleVideo = req.files.file ? req.files.file[0] : null;
        const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;

        const fileUpload = (file, filePath) => new Promise((resolve, reject) => {
            awsUpload(file, filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data)
                }
            });
        });

        if (moduleVideo) {
            const uploadedModule = await fileUpload(moduleVideo, 'ingelt/modules/videos');
            updateData.file = uploadedModule.Key;
            updateData.fileSize = moduleVideo.size;
            getModule.file && await deleteFile(getModule.file);
        }

        if (thumbnail) {
            const uploadedThumbnail = await fileUpload(thumbnail, 'ingelt/modules/thumbnails');
            updateData.thumbnail = uploadedThumbnail.Key;
            getModule.thumbnail && await deleteFile(getModule.thumbnail);
        }

        const result = await moduleUtil.update(req.params.moduleId, updateData);
        res.status(200).json(result);
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