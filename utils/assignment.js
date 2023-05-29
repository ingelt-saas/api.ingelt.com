const { Op, literal } = require("sequelize");
const { assignment, submission, teacher, organisation, batch, student, admin } = require("../models");
const assignmentUtil = {};

// POST
assignmentUtil.create = async (newAssignment) => {
  try {
    let name = newAssignment.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    newAssignment.name = name;
    const result = await assignment.create(newAssignment);
    return result;
  } catch (err) {
    throw err;
  }
};

// get assignments by organization
assignmentUtil.getAssignmentByOrg = async (orgId, pageNo, limit, searchQuery) => {
  try {
    let findQuery;
    if (searchQuery) {
      findQuery = {
        organizationId: orgId,
        name: { [Op.like]: `%${searchQuery}%` }
      };
    } else {
      findQuery = {
        organizationId: orgId,
      }
    }

    const result = await assignment.findAndCountAll({
      where: findQuery,
      include: [
        { model: teacher, as: 'teacherUploader', attributes: [] },
        { model: admin, as: 'adminUploader', attributes: [] },
      ],
      attributes: [
        'id', 'name', 'file', 'fileSize', 'createdAt', 'uploaderId',
        [literal('CASE WHEN `assignment`.`uploaderType` = "Teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `assignment`.`uploaderId`) ELSE (SELECT `name` FROM `admins` WHERE `admins`.`id` = `assignment`.`uploaderId`) END'), 'uploaderName'],
        [literal('CASE WHEN `assignment`.`uploaderType` = "Teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `assignment`.`uploaderId`) ELSE (SELECT `image` FROM `admins` WHERE `admins`.`id` = `assignment`.`uploaderId`) END'), 'uploaderImage'],
      ],
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get all assignment by teacher
assignmentUtil.getAssignmentsByTeacher = async (teacherId, pageNo, limit, searchQuery) => {

  try {

    let findQuery;

    if (searchQuery) {
      findQuery = {
        teacherId: teacherId,
        name: { [Op.like]: `%${searchQuery}%` }
      }
    } else {
      findQuery = {
        teacherId: teacherId,
      }
    }

    const result = await assignment.findAndCountAll({
      offset: (pageNo - 1) * limit,
      limit: limit,
      where: findQuery,
      order: [['createdAt', 'DESC']]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get assignment by student
assignmentUtil.getAssignmentsByStudent = async (studentId, pageNo, limit) => {
  try {
    const result = await assignment.findAndCountAll({
      include: [
        {
          model: organisation,
          required: true,
          attributes: ['name', 'id'],
          include: {
            model: batch,
            required: true,
            attributes: ['name', 'id'],
            include: {
              model: student,
              required: true,
              attributes: [],
              where: {
                id: studentId,
              }
            }
          }
        },
        {
          model: submission,
          required: false,
          where: {
            studentId: studentId,
            status: 'submitted'
          }
        }
      ],
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
      raw: true,
      nest: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// search assignment by student
assignmentUtil.searchAssignmentsByStudent = async (studentId, searchQuery, pageNo, limit) => {
  try {
    const result = await assignment.findAndCountAll({
      where: {
        name: { [Op.like]: `%${searchQuery}%` }
      },
      include: [
        {
          model: organisation,
          required: true,
          attributes: ['name', 'id'],
          include: {
            model: batch,
            required: true,
            attributes: ['name', 'id'],
            include: {
              model: student,
              required: true,
              attributes: [],
              where: {
                id: studentId,
              }
            }
          }
        },
        {
          model: submission,
          required: false,
          where: {
            studentId: studentId,
            status: 'submitted'
          }
        }
      ],
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
      raw: true,
      nest: true,
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// search assignment
assignmentUtil.searchAssignmentByTeacher = async (teacherId, searchQuery) => {
  try {
    const result = await assignment.findAll({
      where: {
        teacherId: teacherId,
        name: { [Op.like]: `%${searchQuery}%` }
      },
      order: [['createdAt', 'DESC']]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get assignments by batch id
assignmentUtil.getAssignmentsByBatch = async (batchId) => {
  try {
    const result = await assignment.findAll({
      where: { batchId: batchId },
      order: [['id', 'DESC']],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get assignments by batch and student 
assignmentUtil.getAssignmentsByBatchAndStu = async (batchId, studentId) => {
  try {

    let result = await assignment.findAll({
      where: { batchId: batchId },
      include: {
        model: submission,
        required: false,
        where: {
          studentId: studentId,
          status: 'submitted'
        },
      },
      nest: true,
      raw: true,
      order: [['createdAt', 'DESC']],
    });

    const newResult = [];
    for (let item of result) {
      item.submissions = item.submissions.id ? item.submissions : null;
      newResult.push(item);
    }

    return newResult;
  } catch (err) {
    console.log(err)
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
