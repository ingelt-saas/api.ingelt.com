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
libraryUtil.read = async () => {
  try {
    const result = await library.findAll({ order: [["id", "DESC"]] });
    return result;
  } catch (err) {
    throw err;
  }
};

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
