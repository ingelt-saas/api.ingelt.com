const express = require('express');
const assignmentService = express.Router();
const assignmentUtil = require('../../utils/assignment');
const { memoryStorage } = require('multer');
const multer = require('multer');
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');

// get all assignment 
assignmentService.get('/get-all', async (req, res) => {
    try {
        const teacherId = req.decoded.id;
        const { pageno, limit } = req.query;
        const result = await assignmentUtil.getAssignmentsByTeacher(teacherId, parseInt(pageno), parseInt(limit));
        res.send(result);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

// get all assignment 
assignmentService.get('/search', async (req, res) => {
    try {
        const teacherId = req.decoded.id;
        const { s } = req.query;
        const result = await assignmentUtil.searchAssignmentByTeacher(teacherId, s)
        res.send(result);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

// add new assignment
assignmentService.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        const newAssignment = req.body;
        newAssignment.name = file.originalname;
        newAssignment.fileSize = file.size;
        newAssignment.teacherId = req.decoded.id;

        awsUpload(file, 'teacher/assignments', async (err, data) => {
            if (err) {
                res.status(400).send(err);
            } else {
                newAssignment.file = data.Key;
                const result = await assignmentUtil.create(newAssignment);
                res.status(201).json(result);
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

// get all assignments by per batch 
assignmentService.get('/batch/:batchId', async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const assignments = await assignmentUtil.getAssignmentsByBatch(batchId);
        res.status(200).json(assignments);
    } catch (err) {
        res.status(400).send(err);
    }
});

// update assignment
assignmentService.put("/:assignmentId", async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const updateData = req.body;
    try {
        const result = await assignmentUtil.update(assignmentId, updateData);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete assignment
assignmentService.delete("/:assignmentId", async (req, res) => {
    const assignmentId = req.params.assignmentId;
    try {
        let getAssignment = await assignmentUtil.readById(assignmentId);
        if (getAssignment) {
            getAssignment = getAssignment.get({ plain: true });
        }
        // delete assignment from cloud
        getAssignment.file && await deleteFile(getAssignment.file);

        await assignmentUtil.delete(assignmentId);
        res.sendStatus(202);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = assignmentService;