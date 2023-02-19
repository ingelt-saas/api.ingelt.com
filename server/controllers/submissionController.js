// import model
const { submission } = require('../models/index');
const { Op } = require('sequelize');

const submissionController = {};

// get submission by per assignment or per student 
submissionController.getSubmissionByAssignOrStu = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await submission.findAll({
            where: {
                [Op.or]: [
                    { assignment_id: id },
                    { student_id: id }
                ]
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// get submission by per assignment and per student 
submissionController.getSubmissionByAssignAndStu = async (req, res) => {
    const assignmentId = req.params.assignmentId;
    const studentId = req.params.studentId;
    try {
        const result = await submission.findAll({
            where: {
                [Op.and]: [
                    { assignment_id: assignmentId },
                    { student_id: studentId }
                ]
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// create a submission 
submissionController.create = async (req, res) => {
    const newSubmission = req.body;
    try {
        const result = await submission.create(newSubmission);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// update submission by student
submissionController.updateSubmissionByStudent = async (req, res) => {
    const studentId = req.params.studentId;
    const updateData = req.body;
    try {
        const result = await submission.update(updateData, {
            where: {
                student_id: studentId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}


module.exports = submissionController;