// import model
const { student } = require('../models/index');

const studentController = {};

// create a student
studentController.create = async (req, res) => {
    const newStudent = req.body;
    try {
        const result = await student.create(newStudent);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

// get all students in a batch 
studentController.getStudentsByBatch = async (req, res) => {
    const batchId = req.params.id;
    try {
        const result = await student.findAll({
            where: {
                batch_id: batchId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// update student 
studentController.update = async (req, res) => {
    const studentId = req.params.id;
    const updateData = req.body;
    try {
        const result = await student.update(updateData, {
            where: {
                id: studentId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

module.exports = studentController;