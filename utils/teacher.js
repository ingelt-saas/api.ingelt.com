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


teacherUtil.capitalizeAllWords = (str) => {
  return str.replace(/\b\w/g, (match) => {
    return match.toUpperCase();
  });
}

// POST
teacherUtil.create = async (newTeacher) => {
  try {
    // Encrypt Password and Set it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newTeacher.password, salt);
    newTeacher.password = hashedPassword;

    let name = newTeacher.name;
    name = teacherUtil.capitalizeAllWords(name);
    newTeacher.name = name;

    const teacherResult = await teacher.create(newTeacher);

    return teacherResult.get({ raw: true })
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
teacherUtil.getTeachersByBatch = async (batchId, pageNo, limit) => {
  try {
    const result = await BatchesTeachers.findAndCountAll({
      where: { batchId: batchId },
      include: {
        model: teacher
      },
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get all teachers in the organization
teacherUtil.readByOrg = async (orgId, pageNo, limit, searchQuery) => {

  let findQuery;

  if (searchQuery) {
    findQuery = {
      organizationId: orgId,
      [Op.or]: [
        { name: { [Op.like]: `%${searchQuery}%` } },
        { email: { [Op.like]: `%${searchQuery}%` } },
      ]
    };
  } else {
    findQuery = {
      organizationId: orgId,
    };
  }

  try {
    let result = await teacher.findAndCountAll({
      where: findQuery,
      attributes: {
        exclude: ['password']
      },
      include: {
        model: batch,
        required: false,
        attributes: ['name', 'id']
      },
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// read by email
teacherUtil.readByEmail = async (email) => {
  try {
    const result = await teacher.findOne({ where: { email: email } });
    return result;
  } catch (err) {
    throw err;
  }
}

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

// read by id with password 
teacherUtil.readByIdWithPWD = async (teacherId) => {
  try {
    let result = await teacher.findByPk(teacherId);
    if (result) {
      result = result.get({ plain: true });
    }
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
        {
          model: organisation,
          // required: true,
        }
      ],
      attributes: { exclude: ['password'] }
    });
    if (result) {
      result = result.get({ plain: true });
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
teacherUtil.totalTeachersInTheOrg = async (orgId) => {
  try {
    const result = await teacher.count({
      where: {
        organizationId: orgId,
      }
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
teacherUtil.teacherSubjectUpdate = async (id, subject) => {
  try {
    const getSubject = await BatchesTeachers.findOne({
      where: { id: id },
      plain: true,
    });

    let newSubjects = [];
    if (!getSubject.subject) {
      newSubjects = [subject];
    } else {
      const subjects = getSubject.subject.split(';');
      if (subjects.includes(subject)) {
        newSubjects = subjects.filter(i => i !== subject);
      } else {
        newSubjects = [...subjects, subject];
      }
    }

    const result = await BatchesTeachers.update({ subject: newSubjects.join(';') }, {
      where: {
        id: id,
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
    if (updateData.name) {
      let name = updateData.name;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      updateData.name = name;
    }
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
