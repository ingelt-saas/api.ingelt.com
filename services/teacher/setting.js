const express = require('express');
const settingService = express.Router();
const teacherUtil = require('../../utils/teacher');

// profile updated
settingService.put('/:teacherId', async (req, res) => {
    try {
        const result = await teacherUtil.update(req.params.teacherId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = settingService;