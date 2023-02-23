// import model
const { admin } = require('../models/index');

const adminController = {};

// create
adminController.create = async (req, res) => {
    const newAdmin = req.body;
    try {
        const result = await admin.create(newAdmin);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// read
adminController.read = async (req, res) => {
    try {
        const result = await admin.findAll({
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
adminController.update = async (req, res) => {
    const adminId = req.params.id;
    const updateData = req.body;
    try {
        const result = await admin.update(updateData, {
            where: {
                id: adminId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// delete
adminController.delete = async (req, res) => {
    const adminId = req.params.id;
    try {
        const result = await admin.destroy({
            where: {
                id: adminId
            }
        });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = adminController;