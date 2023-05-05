const { Op } = require("sequelize");
const { library } = require("../models");
const libraryUtil = {};

// POST
libraryUtil.create = async (newDoc) => {
  try {
    const result = await library.create(newDoc);
    return result;
  } catch (err) {
    throw err;
  }
};

// READ
libraryUtil.read = async (pageNo, limit) => {
  try {
    const result = await library.findAndCountAll({
      offset: (pageNo - 1) * limit,
      limit: limit,
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search
libraryUtil.search = async (searchQuery, pageNo, limit) => {
  try {
    const result = await library.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } },
          { subject: { [Op.like]: `%${searchQuery}%` } },
        ]
      },
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// GET by id
libraryUtil.readById = async (docId) => {
  try {
    const result = await library.findByPk(docId);
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
libraryUtil.delete = async (docId) => {
  try {
    const result = await library.destroy({
      where: {
        id: docId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = libraryUtil;
