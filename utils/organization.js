const { organization } = require("../models");
const organizationUtil = {};

// POST
organizationUtil.create = async (newOrganization) => {
  try {
    const result = await organization.create(newOrganization);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
organizationUtil.read = async () => {
  try {
    const result = await organization.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
organizationUtil.readById = async (organizationId) => {
  try {
    const result = await organization.findByPk(organizationId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
organizationUtil.update = async (organizationId, updateData) => {
  try {
    const result = await organization.update(updateData, {
      where: {
        id: organizationId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
organizationUtil.delete = async (organizationId) => {

  try {
    const result = await organization.destroy({
      where: {
        id: organizationId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = organizationUtil;
