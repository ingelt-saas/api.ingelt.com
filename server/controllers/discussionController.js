const { discussion } = require('../models/index');
const { Op } = require('sequelize');

const discussionController = {};

//  get discussion per batch 
discussionController.getDiscussionByBatch = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await discussion.findAll({
            where: {
                [Op.or]: [
                    { batch_id: id },
                    { sender_id: id },
                ]
            }
        });
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

// create a discussion 
discussionController.create = async (req, res) => {
    const newDiscussion = req.body;
    try {
        const result = await discussion.create(newDiscussion);
        res.send(result);
    } catch (err) {
        res.status(err.status).send(err.message);
    }
}

module.exports = discussionController;