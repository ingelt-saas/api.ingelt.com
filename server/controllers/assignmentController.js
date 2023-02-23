// import model
const { assignment } = require('../models/index');

const assignmentController = {};

// create assignment
assignmentController.create = async (req, res) => {
    const newAssignment = req.body;
    try {
        const result = await assignment.create(newAssignment);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// read
assignmentController.read = async (req, res) => {
    try {
        const result = await assignment.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// update
assignmentController.update = async (req, res) => {
    const assignmentId = req.params.id;
    const updateData = req.body;
    try {
        const result = await assignment.update(updateData, {
            where: {
                id: assignmentId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// delete
assignmentController.delete = async (req, res) => {
    const assignmentId = req.params.id;
    try {
        const result = await assignment.destroy({
            where: {
                id: assignmentId
            }
        });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = assignmentController;