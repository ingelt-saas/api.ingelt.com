// import model
const { batch } = require('../models/index');

const batchController = {};


// create a batch 
batchController.create = async (req, res) => {
    const newBatch = req.body;
    try {
        const result = await batch.create(newBatch);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message)
    }
}


// get all batches
batchController.read = async (req, res) => {
    try {
        const result = await batch.findAll({
            order: [
                ['id', 'DESC']
            ]
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
};

// get batches by a teacher
batchController.getBatchByTeacher = async (req, res) => {
    const batchesId = req.params.batchesId,
        parseBatchesId = JSON.parse(batchesId);
    try {
        const result = await batch.findAll({
            where: {
                id: { in: parseBatchesId }
            }
        });
        res.send(result);
    } catch (err) {
        req.status(err.status).send(err.message);
    }
}

// update batch 
batchController.update = async (req, res) => {
    const batchId = req.params.id;
    const updateData = req.body;
    try {
        const result = await batch.update(updateData, {
            where: {
                id: batchId
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

module.exports = batchController;