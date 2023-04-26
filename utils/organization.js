const { Op } = require("sequelize");
const { organization, studentApplied } = require("../models");
const organizationUtil = {};

// POST
organizationUtil.create = async (newOrganization) => {
  try {
    let result = await organization.create(newOrganization);
    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
organizationUtil.read = async () => {
  try {
    const result = await organization.findAll({
      order: [["createdAt", "ASC"]],
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

// apply
organizationUtil.apply = async (data) => {
  try {
    const result = await studentApplied.create(data);
    return result;
  } catch (err) {
    throw err;
  }
};

// search organization
organizationUtil.search = async (value) => {
  try {
    const result = await organization.findAll({
      where: {
        name: { [Op.like]: `%${value}%` },
      },
    });
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
