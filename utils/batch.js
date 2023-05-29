const { batch, student, teacher, organisation, BatchesTeachers } = require("../models");
const batchUtil = {};
const { Op, Sequelize } = require("sequelize");

// POST
batchUtil.create = async (newBatch) => {
  try {
    let name = newBatch.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    newBatch.name = name;
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
batchUtil.batchesWithStuAndTea = async (orgId, pageNo, limit) => {
  try {
    // get all batches
    const batches = await batch.findAndCountAll({
      include: [
        {
          model: organisation,
          where: { id: orgId },
          required: true,
          attributes: [],
        },
      ],
      order: [["id", "DESC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
      raw: true,
    });

    let batchesArr = []; // define new batch array

    // get students and teacher by batch
    if (Array.isArray(batches.rows)) {
      for (let batch of batches.rows) {
        const students = await student.count({ where: { batchId: batch.id } });
        const teachers = await BatchesTeachers.count({
          where: {
            batchId: batch.id
          },
          attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('teacherId')), 'teachers'],
          ]
        });
        batchesArr.push({ ...batch, students, teachers });
      }
    }

    // return new batch array
    return { count: batches.count, rows: batchesArr };
  } catch (err) {
    throw err;
  }
};

// search all batch and batch students and teacher
batchUtil.searchBatchesWithStuAndTea = async (orgId, search, pageNo, limit) => {
  try {
    // get all batches
    const batches = await batch.findAndCountAll({
      where: {
        name: { [Op.like]: `%${search}%` }
      },
      include: [
        {
          model: organisation,
          where: { id: orgId },
          required: true,
          attributes: [],
        },
      ],
      order: [["id", "DESC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
      raw: true,
    });

    let batchesArr = []; // define new batch array

    // get students and teacher by batch
    if (Array.isArray(batches.rows)) {
      for (let batch of batches.rows) {
        const students = await student.count({ where: { batchId: batch.id } });
        const teachers = await BatchesTeachers.count({
          where: {
            batchId: batch.id
          },
          attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('teacherId')), 'teachers'],
          ]
        });
        batchesArr.push({ ...batch, students, teachers });
      }
    }

    // return new batch array
    return { count: batches.count, rows: batchesArr };
  } catch (err) {
    throw err;
  }
};

// GET by id
batchUtil.readById = async (batchId) => {
  try {
    let result = await batch.findByPk(batchId);
    if (result) {
      result = result.get({ plain: true });
    }

    return result;
  } catch (err) {
    throw err;
  }
};

// get all current batches by organization
batchUtil.batchesActive = async (orgId) => {
  try {
    const result = await batch.findAll({
      where: {
        active: true,
      },
      include: [{ model: organisation, where: { id: orgId }, required: true }],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get COUNT current batches by organization
batchUtil.currentBatchesCount = async (orgId) => {
  try {
    const result = await batch.count({
      where: {
        active: true,
      },
      include: [{ model: organisation, where: { id: orgId }, required: true }],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get COUNT complete batches by organization
batchUtil.completeBatchesCount = async (orgId) => {
  try {
    const batches = await batch.findAll({
      where: {
        active: false,
      },
      attributes: ['endDate'],
      include: [{ model: organisation, where: { id: orgId }, required: true, attributes: [] }],
      raw: true
    });
    let result = 0;

    for (let batch of batches) {
      if (new Date(batch.endDate).getTime() < new Date().getTime()) {
        result++;
      }
    }

    return result;
  } catch (err) {
    throw err;
  }
};

// get average band by teacher
batchUtil.avgBand = async (teacherId) => {
  try {
    const batches = await batch.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: teacher,
          where: { id: teacherId },
        },
      ],
    });
    return batches;
  } catch (err) {
    throw err;
  }
};

// get batches by teacher
batchUtil.getBatchesByTeacher = async (teacherId) => {
  try {
    // const teacherInfo = await teacher.findByPk(teacherId);
    const batches = await batch.findAll({
      include: [
        {
          model: teacher,
          where: { id: teacherId },
        },
      ],
    });
    return batches;
  } catch (err) {
    throw err;
  }
};

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

// end batch
batchUtil.delete = async (batchId) => {
  try {

    // delete batch teachers data
    await BatchesTeachers.destroy({
      where: {
        batchId: batchId
      }
    });

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
