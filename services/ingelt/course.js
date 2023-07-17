const courseService = require('express').Router();

// create
courseService.post('/', async (req, res) => {
    try {

    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = courseService;