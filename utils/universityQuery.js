const { universityQuery } = require("../models");
const studentUtil = require("./student");
const { Op } = require("sequelize");

const universityQueryUtil = {};

// POST
universityQueryUtil.create = async (newUniversityQuery) => {
  try {
    let name = newUniversityQuery.name;
    name = studentUtil.capitalizeAllWords(name);
    newUniversityQuery.name = name;
    const result = await universityQuery.create(newUniversityQuery);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
// GET
universityQueryUtil.read = async () => {
  try {
    const result = await universityQuery.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// GET by id
universityQueryUtil.readById = async (studentId) => {
  try {
    let result = await universityQuery.findOne({
      where: {
        studentId: studentId,
      },
    });
    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
};
// PUT
universityQueryUtil.update = async (studentId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = universityQueryUtil.capitalizeAllWords(name);
      updateData.name = name;
    }
    const result = await universityQuery.update(updateData, {
      where: {
        id: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// DELETE
universityQueryUtil.delete = async (studentId) => {
  try {
    const result = await universityQuery.destroy({
      where: {
        studentId: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// GET by name
universityQueryUtil.readByName = async (name) => {
  try {
    const result = await universityQuery.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = universityQueryUtil;