// import model
const { organization } = require('../models/index');

const organizationController = {};

// create
organizationController.create = async (req, res) => {
    const newOrganization = req.body;
    try {
        const result = await organization.create(newOrganization);
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// read
organizationController.read = async (req, res) => {
    try {
        const result = await organization.findAll({
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
organizationController.update = async (req, res) => {
    const organizationId = req.params.id;
    const updateData = req.body;
    try {
        const result = await organization.update(updateData, {
            where: {
                id: organizationId
            }
        });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

// delete
organizationController.delete = async (req, res) => {
    const organizationId = req.params.id;
    try {
        const result = await organization.destroy({
            where: {
                id: organizationId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = organizationController;