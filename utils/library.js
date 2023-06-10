const { Op } = require("sequelize");
const { library } = require("../models");
const libraryUtil = {};

libraryUtil.capitalizeAllWords = (str) => {
  return str.replace(/\b\w/g, (match) => {
    return match.toUpperCase();
  });
}

// POST
libraryUtil.create = async (newDoc) => {
  try {
    if (newDo.name) {
      newDoc.name = libraryUtil.capitalizeAllWords(newDoc.name);
    }
    const result = await library.create(newDoc);
    return result;
  } catch (err) {
    throw err;
  }
};

// read all
libraryUtil.readAll = async (subject, pageNo, limit, searchQuery = null) => {
  try {
    const sub = subject === 'all' ? ['reading', 'writing', 'speaking', 'listening'] : subject;
    let findQuery;
    if (searchQuery) {
      findQuery = {
        subject: sub,
        name: { [Op.like]: `%${searchQuery}%` }
      }
    } else {
      findQuery = {
        subject: sub,
      };
    }

    const result = await library.findAndCountAll({
      where: findQuery,
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });

    return result;

  } catch (err) {
    throw err;
  }
}

// READ
libraryUtil.read = async (pageNo, limit, searchQuery = null) => {
  try {
    let findQuery;

    if (searchQuery) {
      findQuery = {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { subject: { [Op.like]: `%${searchQuery}%` } },
          ]
        }
      };
    } else {
      findQuery = {};
    }

    const result = await library.findAndCountAll({
      ...findQuery,
      offset: (pageNo - 1) * limit,
      limit: limit,
      order: [["createdAt", "DESC"]],
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
