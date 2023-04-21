const { assignment, submission } = require("../models");
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

// get assignments by batch id
assignmentUtil.getAssignmentsByBatch = async (batchId) => {
  try {
    const result = await assignment.findAll({ where: { batchId: batchId }, order: [['id', 'DESC']], plain: true });
    return result;
  } catch (err) {
    throw err;
  }
}

// get assignments and assignment submission by batch 
assignmentUtil.getAssignmentAndSubmission = async (batchId) => {
  try {
    const result = await assignment.findAll({
      where: {
        batchId: batchId,
      },
      include: [
        { model: submission, required: false, attributes: ['id'] }
      ],
      order: [['createdAt', 'ASC']]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

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
