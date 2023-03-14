const express = require("express");
const submissionUtil = require("../../utils/batch");
const submissionService = express.Router();

// create new submission 
submissionService.post("/", async (req, res) => {
    try {
        const result = await submissionUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get submission by per assignment or per student
submissionService.get("/:id", async (req, res) => {
    try {
        const result = await submissionUtil.getSubmissionByAssignOrStu(req.params.id);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get submission by per assignment and per student
submissionService.get("/:assignmentId/:studentId", async (req, res) => {
    try {
        const result = await submissionUtil.getSubmissionByAssignAndStu(req.params.assignmentId, req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update submission by student id
submissionService.put("/:studentId", async (req, res) => {
    try {
        const result = await submissionUtil.updateSubmissionByStudent(req.params.studentId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});


// delete submission
submissionService.delete("/:submissionId", async (req, res) => {
    try {
        const result = await submissionUtil.delete(req.params.submissionId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = submissionService;
