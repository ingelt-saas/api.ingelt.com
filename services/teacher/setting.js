const express = require('express');
const settingService = express.Router();
const teacherUtil = require('../../utils/teacher');
const bcrypt = require('bcrypt');
const deleteFile = require('../../aws/delete');
const { memoryStorage } = require('multer');
const multer = require('multer');
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');

// profile image update 
settingService.post('/profileImage', upload.single('image'), async (req, res) => {
    try {

        const teacherId = req.decoded.id;
        const teacher = await teacherUtil.readByIdWithPWD(teacherId);
        const file = req.file;

        awsUpload(file, 'teacher/profile', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                await teacherUtil.update(teacherId, { image: data?.Key });
                teacher?.image && await deleteFile(teacher.image); // delete previous image
                res.send({ image: data?.Key });
            }
        });

    } catch (err) {
        res.status(400).send(err);
    }
});

// password update
settingService.put('/changePassword', async (req, res) => {
    try {

        const prevPwd = req.body.prevPassword;
        const teacher = await teacherUtil.readByIdWithPWD(req.decoded.id);
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

// profile updated
settingService.put('/', async (req, res) => {
    try {
        const teacherId = req.decoded.id
        const result = await teacherUtil.update(teacherId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = settingService;