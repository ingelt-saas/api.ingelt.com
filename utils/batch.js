const { batch, student, teacher, organisation } = require("../models");
const batchUtil = {};
const { Op } = require('sequelize');

// POST
batchUtil.create = async (newBatch) => {
  try {
    const result = await batch.create(newBatch);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
batchUtil.read = async () => {
  try {
    const result = await batch.findAll({
      order: [["name", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get all batch and batch students and teacher
batchUtil.batchesWithStuAndTea = async (orgId) => {
  try {
    // get all batches
    const batches = await batch.findAll({
      include: [{ model: organisation, where: { id: orgId }, required: true, attributes: [] }],
      order: [["id", "DESC"]],
      raw: true
    });
    let batchesArr = []; // define new batch array

    // get students and teacher by batch 
    for (let batch of batches) {

      const students = await student.count({ where: { batchId: batch.id } });
      const teachers = await teacher.count({ where: { batchId: batch.id } });
      batchesArr.push({ batch, students, teachers });
    }
    // return new batch array
    return batchesArr;
  } catch (err) {
    throw err;
  }
}

// GET by id
batchUtil.readById = async (batchId) => {
  try {
    const result = await batch.findByPk(batchId);
    return result;
  } catch (err) {
    throw err;
  }
};

// get current batches by organization
batchUtil.currentBatches = async (orgId) => {
  try {
    const result = await batch.count({
      where: {
        active: true,
      },
      include: [
        { model: organisation, where: { id: orgId }, required: true }
      ]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get complete batches by organization
batchUtil.completeBatches = async (orgId) => {
  try {
    const result = await batch.count({
      where: {
        active: false,
        endDate: {
          [Op.lte]: new Date()
        }
      },
      include: [
        { model: organisation, where: { id: orgId }, required: true }
      ]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get average band by teacher
batchUtil.avgBand = async (teacherId) => {
  try {
    const batches = await batch.findAll({
      include: [
        {
          model: teacher,
          where: { id: teacherId }
        }
      ]
    });
    return batches;
  } catch (err) {
    throw err;
  }
}

// get batches by teacher
batchUtil.getBatchesByTeacher = async (teacherId) => {
  try {
    // const teacherInfo = await teacher.findByPk(teacherId);
    const batches = await batch.findAll({
      include: [
        {
          model: teacher,
          where: { id: teacherId }
        }
      ]
    });
    return batches;
  } catch (err) {
    throw err;
  }
}

// PUT
batchUtil.update = async (batchId, updateData) => {
  try {
    const result = await batch.update(updateData, {
      where: {
        id: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
batchUtil.delete = async (batchId) => {
  try {
    const result = await batch.destroy({
      where: {
        id: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = batchUtil;
