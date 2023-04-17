const express = require('express');
const settingService = express.Router();
const teacherUtil = require('../../utils/teacher');
const bcrypt = require('bcrypt');

// profile updated
settingService.put('/:teacherId', async (req, res) => {
    try {
        const result = await teacherUtil.update(req.params.teacherId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


// password update
settingService.put('/changePassword', async (req, res) => {
    try {
        const prevPwd = req.body.prevPassword;
        const teacher = await teacherUtil.readById(req.decoded.id);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        if (await bcrypt.compare(prevPwd, teacher.password)) {
            const result = await teacherUtil.update(req.decoded.id, { password: hashedPassword });
            res.send(result);
        } else {
            res.status(401).send({ message: 'Your previous password does not match.' });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = settingService;