// import model
const { teacher } = require('../models/index');

const teacherController = {};

// create a teacher 
teacherController.create = async (req, res) => {
    const newTeacher = req.body;
    try {
        const result = await teacher.create(newTeacher);
        res.send(result);
    } catch (err) {
        res.status(err.status).res.send(err.message);
    }
};

// get all teachers in a batch 
teacherController.getTeachersByBatch = async (req, res) => {
    const batchId = req.params.id;
    try {
        const result = await teacher.findAll({
            where: {
                batch_id: batchId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// update teacher
teacherController.update = async (req, res) => {
    const teacherId = req.params.id;
    const updateData = req.body;
    try {
        const result = await teacher.update(updateData, {
            where: {
                id: teacherId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

// delete teacher 
teacherController.delete = async (req, res) => {
    const teacherId = req.params.id;
    try {
        const result = await teacher.destroy({
            where: {
                id: teacherId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

module.exports = teacherController;