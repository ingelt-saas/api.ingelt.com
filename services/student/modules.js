const moduleUtil = require('../../utils/modules');

const moduleService = require('express').Router();

// get modules
moduleService.get('/getall', async (req, res) => {
    try {
        const { s, pageNo, limit, type } = req.query;
        const result = await moduleUtil.getModulesForStudent(parseInt(pageNo), parseInt(limit), type, s);
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// count views 
moduleService.put('/countViews/:moduleId', async (req, res) => {
    try {
        const getModule = await moduleUtil.readById(req.params.moduleId);
        const result = await moduleUtil.update(req.params.moduleId, { views: getModule.views + 1 });
        res.status(202).json(result);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

module.exports = moduleService;