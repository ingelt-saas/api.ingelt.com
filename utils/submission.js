const { submission, student } = require("../models");
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

// get submission by student 
submissionUtil.getSubmissionByStudent = async (studentId) => {
  try {
    const result = await submission.findAll({
      where: {
        studentId: studentId,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get submission by assignment
submissionUtil.getSubmissionByAssignment = async (assignmentId, pageNo, limit) => {
  try {
    const result = await submission.findAndCountAll({
      offset: (pageNo - 1) * limit,
      limit: limit,
      where: {
        assignmentId: assignmentId,
        status: 'submitted'
      },
      include: {
        model: student,
        required: true,
      },
      order: [
        ['evaluated', 'ASC'],
      ],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get submission by per assignment and per student
submissionUtil.getSubmissionByAssignAndStu = async (
  assignmentId,
  studentId
) => {
  try {
    const result = await submission.findOne({
      where: {
        [Op.and]: [{ assignmentId: assignmentId }, { studentId: studentId }],
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search submission
submissionUtil.searchSubmission = async (assignmentId, searchQuery) => {
  try {
    const result = await submission.findAll({
      where: {
        assignmentId: assignmentId,
        status: 'submitted',
      },
      include: {
        model: student,
        required: true,
        where: {
          name: { [Op.like]: `%${searchQuery}%` }
        }
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// POST
submissionUtil.create = async (newSubmission) => {
  try {
    const result = await submission.create(newSubmission);
    return result;
  } catch (err) {
    throw err;
  }
};

// read by id 
submissionUtil.readById = async (submissionId) => {
  try {
    const result = (await submission.findByPk(submissionId)).get({ plain: true });
    return result;
  } catch (err) {
    throw err;
  }
}

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
