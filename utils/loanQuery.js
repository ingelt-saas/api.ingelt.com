const { Op } = require("sequelize");
const { student, loanQuery, organisation } = require("../models");
const studentUtil = require("./student");

const loanQueryUtil = {};

// POST
loanQueryUtil.create = async (newLoanQuery) => {
  try {
    let name = newLoanQuery.name;
    name = studentUtil.capitalizeAllWords(name);
    newLoanQuery.name = name;
    const result = await loanQuery.create(newLoanQuery);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
loanQueryUtil.read = async (pageNo, limit, searchQuery) => {
  try {

    let findQuery = {};
    if (searchQuery) {
      findQuery = {
        where: {
          [Op.or]: [
            { '$student.name$': { [Op.like]: `%${searchQuery}%` } },
            { '$student.email$': { [Op.like]: `%${searchQuery}%` } },
          ]
        }
      };
    }

    const result = await loanQuery.findAndCountAll({
      ...findQuery,
      include: {
        model: student,
        required: true,
        attributes: ['name', 'id', 'image', 'email', 'dob'],
        include: {
          model: organisation,
          attributes: ['name', 'id', 'address', 'logo']
        }
      },
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// GET by id
loanQueryUtil.readById = async (studentId) => {
  try {
    let result = await loanQuery.findOne({
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
loanQueryUtil.update = async (studentId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = studentUtil.capitalizeAllWords(name);
      updateData.name = name;
    }
    console.log(updateData);
    const result = await loanQuery.update(updateData, {
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
loanQueryUtil.delete = async (studentId) => {
  try {
    const result = await loanQuery.destroy({
      where: {
        studentId: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = loanQueryUtil;
