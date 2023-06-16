const categoryUtil = require('../../utils/category');

const categoryService = require('express').Router();

// category add
categoryService.post('/', async (req, res) => {
    try {
        const newCategory = req.body;

        // check if category exists
        if (await categoryUtil.checkByName(newCategory.name)) {
            return res.status(403).json({ message: 'Already exists category' });
        } else {
            const result = await categoryUtil.create(newCategory);
            res.status(201).json(result);
        }

    } catch (err) {
        res.status(400).send(err);
    }
});

// get all categories
categoryService.get('/getall', async (req, res) => {
    try {
        const result = await categoryUtil.read();
        res.json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update category
categoryService.put('/:categoryId', async (req, res) => {
    try {
        const result = await categoryUtil.update(req.params.categoryId, req.body);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// delete category
categoryService.delete('/:categoryId', async (req, res) => {
    try {
        const result = await categoryUtil.delete(req.params.categoryId);
        res.status(200).send({ message: 'OK' });
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = categoryService;