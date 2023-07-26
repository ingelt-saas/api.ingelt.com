const moduleUtil = require('../../utils/modules');
const moduleService = require('express').Router();
const deleteFile = require('../../aws/delete');

// create modules
moduleService.post('/', async (req, res) => {
    try {
        const newModule = req.body;
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
moduleService.put('/:moduleId', async (req, res) => {
    try {

        const updateData = req.body;
        const getModule = await moduleUtil.readById(req.params.moduleId);

        if (updateData.file) {
            getModule.file && await deleteFile(getModule.file);
        }

        if (updateData.thumbnail) {
            getModule.file && await deleteFile(getModule.thumbnail);
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