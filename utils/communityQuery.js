const { communityQuery } = require("../models");
const studentUtil = require("./student");

const communityQueryUtil = {};

// POST
communityQueryUtil.create = async (newCommunityQuery) => {
  try {
    let name = newCommunityQuery.name;
    name = studentUtil.capitalizeAllWords(name);
    newCommunityQuery.name = name;
    const result = await communityQuery.create(newCommunityQuery);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// GET all
communityQueryUtil.read = async () => {
  try {
    const result = await communityQuery.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
communityQueryUtil.readById = async (studentId) => {
  try {
    // console.log(studentId);
    let result = await communityQuery.findOne({
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
communityQueryUtil.update = async (studentId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = studentUtil.capitalizeAllWords(name);
      updateData.name = name;
    }
    console.log(updateData);
    const result = await communityQuery.update(updateData, {
      where: {
        studentId: studentId,
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// DELETE
communityQueryUtil.delete = async (studentId) => {
  try {
    const result = await communityQuery.destroy({
      where: {
        studentId: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};


module.exports = communityQueryUtil;