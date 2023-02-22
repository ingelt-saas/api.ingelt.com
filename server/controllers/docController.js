// import model
const { document } = require('../models/index');
const { Op } = require('sequelize');

const docController = {};

// create a doc
docController.create = async (req, res) => {
    const newDoc = req.body;
    try {
        const result = document.create(newDoc);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

// get all organizations doc 
docController.getDocsByOrg = async (req, res) => {
    const orgId = req.params.id;
    try {
        const result = await document.findAll({
            where: {
                org_id: orgId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// delete document by batch id or organization id
docController.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await document.destroy({
            where: {
                [Op.or]: [
                    { batch_id: id },
                    { org_id: id }
                ]
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

module.exports = docController;