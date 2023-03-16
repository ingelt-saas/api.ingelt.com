const { student } = require("../models");
const { Sequelize, Op } = require('sequelize');
const studentUtil = {};

// POST
studentUtil.create = async (newStudent) => {
  try {
    const result = await student.create(newStudent);
    return result;
  } catch (err) {
    throw err;
  }
};

// READ
studentUtil.read = async () => {
  try {
    const result = await student.findAll({
      order: ['name', 'ASC']
    });
  } catch (err) {
    throw err;
  }
}

// get total student 
studentUtil.totalStudents = async () => {
  try {
    const result = await student.count();
    return result;
  } catch (err) {
    throw err;
  }
}

// best students 
studentUtil.bestStudents = async () => {
  try {
    const result = await student.findAll({
      attributes: [[Sequelize.fn('max', Sequelize.col('totalAverageBand'))]],
      limit: 4
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// enrollment student count by every single month
studentUtil.enrollmentStudent = async () => {
  try {
    const dates = await student.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('createdAt')), 'date'],
      ],
    });

    let result = [];
    // get years and month from dates array
    if (Array.isArray(dates)) {
      const yearAndMonth = [];

      // delete duplicate year and month
      for (let date of dates) {
        // extract year and month from date object
        date = { ...date };
        const year = new Date(date.dataValues.date).getFullYear();
        const month = new Date(date.dataValues.date).getMonth() + 1;

        // duplicate date check
        if (!yearAndMonth.find(i => i.year === year && i.month === month)) {
          yearAndMonth.push({ year, month });
        }
      }

      // count row by year and month
      for (let { year, month } of yearAndMonth) {
        const rows = await student.count({
          where: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), month),
              Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), year),
            ]
          }
        });
        // push the result array
        result.push({ year, month, count: rows });
      }

    }

    return result;
  } catch (err) {
    throw err;
  }
}

// GET all students by batch id
studentUtil.getStudentsByBatch = async (batchId) => {
  try {
    const result = await student.findAll({
      where: {
        batchId: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by id
studentUtil.readById = async (studentId) => {
  try {
    const result = await student.findByPk(studentId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
studentUtil.update = async (studentId, updateData) => {
  try {
    const result = await student.update(updateData, {
      where: {
        id: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
studentUtil.delete = async (studentId) => {
  try {
    const result = await student.destroy({
      where: {
        id: studentId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = studentUtil;
