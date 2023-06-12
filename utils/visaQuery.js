const { visaQuery } = require("../models");
const studentUtil = require("./student");

const visaQueryUtil = {};

// POST
visaQueryUtil.create = async (newVisaQuery) => {
  try {
    let name = newVisaQuery.name;
    name = studentUtil.capitalizeAllWords(name);
    newVisaQuery.name = name;
    const result = await visaQuery.create(newVisaQuery);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
// GET
visaQueryUtil.read = async () => {
  try {
    const result = await visaQuery.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// GET by id
visaQueryUtil.readById = async (studentId) => {
  try {
    let result = await visaQuery.findOne({
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
visaQueryUtil.update = async (studentId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = studentUtil.capitalizeAllWords(name);
      updateData.name = name;
    }
    console.log(updateData);
    const result = await visaQuery.update(updateData, {
      where: {
        studentId: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// DELETE
visaQueryUtil.delete = async (studentId) => {
  try {
    const result = await visaQuery.destroy({
      where: {
        studentId: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
module.exports = visaQueryUtil;
