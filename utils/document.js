const { document } = require("../models");
const documentUtil = {};

// POST
documentUtil.create = async (newDoc) => {
  try {
    const result = await document.create(newDoc);
    return result;
  } catch (err) {
    throw err;
  }
};

// READ
documentUtil.read = async () => {
  try {
    const result = await document.findAll({ order: [['id', 'DESC']] });
    return result;
  } catch (err) {
    throw err;
  }
};

// get all organizations doc
documentUtil.getDocsByOrg = async (orgId) => {
  try {
    const result = await document.findAll({
      where: {
        organizationId: orgId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
documentUtil.readById = async (docId) => {
  try {
    const result = await document.findByPk(docId);
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
documentUtil.delete = async (docId) => {
  try {
    const result = await document.destroy({
      where: {
        id: docId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = documentUtil;
