const { student } = require("../models");
const studentUtil = {};

// POST
studentUtil.create = async (newStudent) => {
  try {
    const result = await student.create(newStudent);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
studentUtil.getStudentsByBatch = async (batchId) => {
  try {
    const result = await student.findAll({
      where: {
        batchId: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
studentUtil.readById = async (studentId) => {
  try {
    const result = await student.findByPk(studentId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
studentUtil.update = async (studentId, updateData) => {
  try {
    const result = await student.update(updateData, {
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
studentUtil.delete = async (studentId) => {
  try {
    const result = await student.destroy({
      where: {
        id: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = studentUtil;
