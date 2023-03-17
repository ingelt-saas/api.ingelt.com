const { submission } = require("../models");
const { Op } = require("sequelize");
const submissionUtil = {};

// get submission by per assignment or per student
submissionUtil.getSubmissionByAssignOrStu = async (id) => {
  try {
    const result = await submission.findAll({
      where: {
        [Op.or]: [{ assignmentId: id }, { studentId: id }],
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get submission by assignment
submissionUtil.getSubmissionByAssignment = async (assignmentId) => {
  try {
    const result = await submission.findAll({ where: { assignmentId }, order: [['id', 'ASC']] });
    return result;
  } catch (err) {
    throw Error(err);
  }
}

// get submission by per assignment and per student
submissionUtil.getSubmissionByAssignAndStu = async (
  assignmentId,
  studentId
) => {
  try {
    const result = await submission.findAll({
      where: {
        [Op.and]: [{ assignmentId: assignmentId }, { studentId: studentId }],
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// POST
submissionUtil.create = async (newSubmission) => {
  try {
    const result = await submission.create(newSubmission);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
submissionUtil.updateSubmissionByStudent = async (studentId, updateData) => {
  try {
    const result = await submission.update(updateData, {
      where: {
        student_id: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
submissionUtil.update = async (submissionId, updateData) => {
  try {
    const result = await submission.update(updateData, {
      where: {
        id: submissionId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
submissionUtil.delete = async (submissionId) => {
  try {
    const result = await submission.destroy({
      where: {
        id: submissionId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = submissionUtil;
