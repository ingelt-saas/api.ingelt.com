const { batch } = require("../models");
const batchUtil = {};

// POST
batchUtil.create = async (newBatch) => {
  try {
    const result = await batch.create(newBatch);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
batchUtil.read = async () => {
  try {
    const result = await batch.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
batchUtil.readById = async (batchId) => {
  try {
    const result = await batch.findByPk(batchId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
batchUtil.update = async (batchId, updateData) => {
  try {
    const result = await batch.update(updateData, {
      where: {
        id: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
batchUtil.delete = async (batchId) => {
  try {
    const result = await batch.destroy({
      where: {
        id: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = batchUtil;
