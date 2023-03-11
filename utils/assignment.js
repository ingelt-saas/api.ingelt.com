const { assignment } = require("../models");
const assignmentUtil = {};

// POST
assignmentUtil.create = async (newAssignment) => {
  try {
    const result = await assignment.create(newAssignment);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
assignmentUtil.read = async () => {
  try {
    const result = await assignment.findAll({
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
assignmentUtil.readById = async (assignmentId) => {
  try {
    const result = await assignment.findByPk(assignmentId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
assignmentUtil.update = async (assignmentId, updateData) => {
  try {
    const result = await assignment.update(updateData, {
      where: {
        id: assignmentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
assignmentUtil.delete = async (assignmentId) => {
  try {
    const result = await assignment.destroy({
      where: {
        id: assignmentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = assignmentUtil;
