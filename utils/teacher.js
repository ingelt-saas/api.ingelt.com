const { teacher, batch, student } = require("../models");
const { Op } = require('sequelize');
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

// GET all teacher by batch id
teacherUtil.getTeachersByBatch = async (batchId) => {
  try {
    const result = await teacher.findAll({
      where: {
        batchId: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get all teachers 
teacherUtil.read = async () => {
  try {
    const result = await teacher.findAll({ order: [['name', 'ASC']] });
    return result;
  } catch (err) {
    throw err;
  }
}

// GET by id
teacherUtil.readById = async (teacherId) => {
  try {
    const result = await teacher.findByPk(teacherId);
    return result;
  } catch (err) {
    throw err;
  }
};

// get live batches and complete batches by teacher id
teacherUtil.liveAndCompleteBatches = async (teacherId) => {
  try {

    // get teacher by teacher id
    const teacherInfo = await teacher.findByPk(teacherId);

    // get batches
    const batches = teacherInfo.batchId;
    let liveBatches = 0;
    let completeBatches = 0;

    // get the batches a batch id and check which batch is live and which batch is complete
    for (let batchId of batches) {

      // get batch by batch id  
      let batchInfo = await batch.findByPk(batchId);
      if (batchInfo) {
        // live batch check
        if (batchInfo.active) {
          liveBatches++;
        } else // complete batch check
          if (!batchInfo.active && (new Date().getTime(batchInfo.endDate) < new Date().getTime())) {
            completeBatches++;
          }
      }

    }

    // return complete and live batches as a object
    return { completeBatches, liveBatches };

  } catch (err) {
    throw err;
  }
}

// get taught students and band students by teacher id
teacherUtil.taughtAndBandStudents = async (teacherId) => {

  try {
    // get teacher by teacher id
    const teacher = await teacher.findByPk(teacherId);

    // get batches
    const batches = teacher.batchId;
    let taughtStudents = 0;
    let bandStudents = 0;

    // get students by batch id
    for (let batchId of batches) {

      // taught students 
      taughtStudents = await student.count({ where: { batchId: batchId } });
      bandStudents = await student.count({
        where: {
          batchId: batchId,
          totalAverageBand: {
            [Op.gte]: 7.5
          }
        }
      });

    }

    // return taught and band students as a object
    return { taughtStudents, bandStudents };

  } catch (err) {
    throw err;
  }
}


// total teachers
teacherUtil.totalTeachers = async () => {
  try {
    const result = await teacher.count({
      active: true
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// PUT
teacherUtil.update = async (teacherId, updateData) => {
  try {
    const result = await teacher.update(updateData, { where: { id: teacherId } });
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
