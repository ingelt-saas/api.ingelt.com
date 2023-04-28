const { admin, organization } = require("../models");
const bcrypt = require("bcrypt");
const adminUtil = {};

// POST
adminUtil.create = async (newAdmin) => {
  try {
    // Encrypt Password and Set it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newAdmin.password, salt);
    newAdmin.password = hashedPassword;

    // Saving Admin
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
    let result = await admin.findOne({
      where: {
        id: adminId,
      },
      include: {
        model: organization,
        required: false,
      }
    });
    if (result) {
      result = result.get({ plain: true });
      delete result.password;
    }
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
