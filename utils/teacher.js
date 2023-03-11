const { teacher } = require("../models");
const teacherUtil = {};

// POST
teacherUtil.create = async (newTeacher) => {
  try {
    const result = await teacher.create(newTeacher);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
teacherUtil.getTeachersByBatch = async (batchId) => {
  try {
    const result = await teacher.findAll({
      where: {
        batch_id: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
teacherUtil.readById = async (teacherId) => {
  try {
    const result = await teacher.findByPk(teacherId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
teacherUtil.update = async (teacherId, updateData) => {
  try {
    const result = await teacher.update(updateData, {
      where: {
        id: teacherId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
teacherUtil.delete = async (teacherId) => {
  try {
    const result = await teacher.destroy({
      where: {
        id: teacherId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = teacherUtil;
