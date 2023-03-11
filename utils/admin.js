const { admin } = require("../models");
const adminUtil = {};

// POST
adminUtil.create = async (newAdmin) => {
  try {
    const result = await admin.create(newAdmin);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
adminUtil.read = async () => {
  try {
    const result = await admin.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
adminUtil.readById = async (adminId) => {
  try {
    const result = await admin.findByPk(adminId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
adminUtil.update = async (adminId, updateData) => {
  try {
    const result = await admin.update(updateData, {
      where: {
        id: adminId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
adminUtil.delete = async (adminId) => {
  try {
    const result = await admin.destroy({
      where: {
        id: adminId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = adminUtil;
