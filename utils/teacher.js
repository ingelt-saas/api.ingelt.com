const {
  teacher,
  batch,
  student,
  BatchesTeachers,
  organisation,
} = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const teacherUtil = {};

// POST
teacherUtil.create = async (newTeacher) => {
  try {
    // Encrypt Password and Set it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newTeacher.password, salt);
    newTeacher.password = hashedPassword;

    const teacherResult = await teacher.create(newTeacher);

    // Create Entry in Batch-Teacher
    const result = await BatchesTeachers.create({
      batchId: newTeacher.batchId,
      teacherId: teacherResult.id,
      subject: newTeacher.subject,
    });
    return {
      ...teacherResult.get({ raw: true }),
      ...result.get({ raw: true }),
    };
  } catch (err) {
    throw err;
  }
};

// add teacher in a batch
teacherUtil.addTeacherInBatch = async (data) => {
  try {
    const result = await BatchesTeachers.create(data);
    return result;
  } catch (err) {
    throw err;
  }
}

// GET all teacher by batch id
teacherUtil.getTeachersByBatch = async (batchId) => {
  try {
    const result = await BatchesTeachers.findAll({
      where: { batchId: batchId },
      include: {
        model: teacher
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get all teachers in the organization
teacherUtil.read = async (orgId) => {
  try {
    const result = await teacher.findAll({
      include: {
        model: batch,
        as: "batches",
        required: true,
        include: {
          model: organisation,
          where: { id: orgId },
          required: true,
          attributes: [],
        },
      },
      order: [["name", "ASC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search teacher
teacherUtil.search = async (searchQuery) => {
  try {
    const result = await teacher.findAll({
      where: {
        name: { [Op.like]: `%${searchQuery}%` }
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// GET by id
teacherUtil.readById = async (teacherId) => {
  try {
    let result = await teacher.findByPk(teacherId, {
      include: [
        {
          model: batch,
          as: "batches",
        },
      ],
    });
    if (result) {
      result = result.get({ plain: true });
      delete result.password;
    }
    return result;
  } catch (err) {
    throw err;
  }
};

// batches updated by teacher
teacherUtil.batchesUpdated = async (teacherId, updateData) => {
  try {
    // if check is batch id exists
    // const searchBatch =
  } catch (err) {
    throw err;
  }
};

// get live batches and complete batches by teacher id
teacherUtil.liveAndCompleteBatches = async (teacherId) => {

  try {

    const completeBatches = await batch.count({
      where: {
        active: false,
        endDate: {
          [Op.lte]: new Date()
        }
      },
      include: {
        model: teacher,
        Request: true,
        where: {
          id: teacherId,
        }
      }
    });

    const liveBatches = await batch.count({
      where: {
        active: true,
      },
      include: {
        model: teacher,
        required: true,
        where: {
          id: teacherId,
        }
      }
    });

    // return complete and live batches as a object
    return { completeBatches, liveBatches };

    // new Date().getTime(batchInfo.endDate) < new Date().getTime()

  } catch (err) {
    throw err;
  }
};

// get taught students and band students by teacher id
teacherUtil.taughtAndBandStudents = async (teacherId) => {
  try {

    const bandStudents = await student.count({
      where: {
        averageBands: {
          [Op.gte]: 7.5,
        }
      },
      include: {
        model: batch,
        required: true,
        include: {
          model: teacher,
          required: true,
          where: {
            id: teacherId
          }
        }
      }
    });

    const taughtStudents = await student.count({
      include: {
        model: batch,
        required: true,
        include: {
          model: teacher,
          required: true,
          where: {
            id: teacherId
          }
        }
      }
    });

    // return taught and band students as a object
    return { taughtStudents, bandStudents };

  } catch (err) {
    console.log(err);
    throw err;
  }
};

// total teachers by organization
teacherUtil.totalTeachers = async (orgId) => {
  try {
    const result = await teacher.count({
      where: { active: true },
      include: [
        {
          model: batch,
          include: {
            model: organisation,
            where: { id: orgId },
            required: true,
          },
          required: true,
        },
      ],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// delete teacher form batch
teacherUtil.deleteTeacherFromBatch = async (batchId, teacherId) => {
  try {
    const result = await BatchesTeachers.destroy({
      where: {
        batchId: batchId,
        teacherId: teacherId,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// teacher subject update
teacherUtil.teacherSubjectUpdate = async (batchId, teacherId, subject) => {
  try {
    const getSubject = await BatchesTeachers.findOne({
      where: {
        batchId: batchId,
        teacherId: teacherId,
      },
      plain: true,
    });

    let newSubjects = [];
    const subjects = getSubject.subject.split(';');
    if (subjects.includes(subject)) {
      newSubjects = subjects.filter(i => i !== subject);
    } else {
      newSubjects = [...subjects, subject];
    }

    const result = await BatchesTeachers.update({ subject: newSubjects.join(';') }, {
      where: {
        batchId: batchId,
        teacherId: teacherId,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// PUT
teacherUtil.update = async (teacherId, updateData) => {
  try {
    const result = await teacher.update(updateData, {
      where: { id: teacherId },
    });
    return result;
  } catch (err) {
    console.log(err);
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
