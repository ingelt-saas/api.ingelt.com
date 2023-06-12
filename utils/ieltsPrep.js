const { ieltsPrep } = require("../models");
const studentUtil = require("./student");
const ieltsPrepUtil = {};

// POST
ieltsPrepUtil.create = async (newIeltsPrep) => {
  try {
    let name = newIeltsPrep.name;
    name = studentUtil.capitalizeAllWords(name);
    newIeltsPrep.name = name;
    const result = await ieltsPrep.create(newIeltsPrep);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET all
ieltsPrepUtil.read = async () => {
  try {
    const result = await ieltsPrep.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// GET by id
ieltsPrepUtil.readById = async (studentId) => {
  try {
    let result = await ieltsPrep.findOne({
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
ieltsPrepUtil.update = async (studentId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = ieltsPrepUtil.capitalizeAllWords(name);
      updateData.name = name;
    }
    const result = await ieltsPrep.update(updateData, {
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
ieltsPrepUtil.delete = async (studentId) => {
  try {
    const result = await ieltsPrep.destroy({
      where: {
        studentId: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = ieltsPrepUtil;