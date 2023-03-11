const { discussion } = require("../models");
const discussionUtil = {};

// POST
discussionUtil.create = async (newDiscussion) => {
  try {
    const result = await discussion.create(newDiscussion);
    return result;
  } catch (err) {
    return err;
  }
};

// GET all by batch id
discussionUtil.getDiscussionsByBatch = async (batchId) => {
  try {
    const result = await discussion.findAll({
      where: {
        batchId: batchId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

// GET by id
discussionUtil.readById = async (discussionId) => {
  try {
    const result = await discussion.findByPk(discussionId);
    return result;
  } catch (err) {
    return err;
  }
};

// PUT
discussionUtil.update = async (discussionId, updateData) => {
  try {
    const result = await discussion.update(updateData, {
      where: {
        id: discussionId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

// DELETE
discussionUtil.delete = async (discussionId) => {
  try {
    const result = await discussion.destroy({
      where: {
        id: discussionId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = discussionUtil;
