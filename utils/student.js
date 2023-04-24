const { student, mockTestMarks, batch, organization, mockTest } = require("../models");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");
const studentUtil = {};

// POST
studentUtil.create = async (newStudent) => {
  try {
    // Encrypt Password and Set it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newStudent.password, salt);
    newStudent.password = hashedPassword;

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
      order: [["id", "ASC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search students
studentUtil.search = async (searchValue) => {
  try {
    const result = await student.findAll({
      where: {
        name: { [Op.like]: `%${searchValue}%` }
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get total student in the organization
studentUtil.totalStudents = async (orgId) => {
  try {
    const result = await student.count({
      include: [
        {
          model: batch,
          include: { model: organization, where: { id: orgId } },
          required: true,
        },
      ],
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get All Students in an Organization
studentUtil.allStuByOrgId = async (orgId) => {
  try {
    const result = await student.findAll({
      include: [
        {
          model: batch,
          include: { model: organization, where: { id: orgId } },
          required: true,
        },
      ],
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// best students in the organization
studentUtil.bestStudents = async (orgId) => {
  try {
    const result = await student.findAll({
      include: [
        {
          model: batch,
          required: true,
          include: {
            model: organization,
            where: { id: orgId },
            required: true,
          },
        },
      ],
      limit: 4,
      order: [["averageBands", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// enrollment student count by every single month / enroll student by batch and organization
studentUtil.enrollmentStudent = async (orgId) => {
  try {
    const students = await student.findAll({
      include: [
        {
          model: batch,
          required: true,
          include: {
            model: organization,
            where: { id: orgId },
            required: true,
          },
        },
      ],
      raw: true,
    });

    let result = [];

    // get years and month from dates array
    if (Array.isArray(students)) {
      const yearAndMonth = [];

      // delete duplicate year and month
      for (let stu of students) {
        // extract year and month from date object
        let date = stu.createdAt;
        date = new Date(date);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        // duplicate date check
        if (!yearAndMonth.find((i) => i.year === year && i.month === month)) {
          yearAndMonth.push({ year, month });
        }
      }

      // count row by year and month
      for (let { year, month } of yearAndMonth) {
        const rows = await student.count({
          where: {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn("MONTH", Sequelize.col("createdAt")),
                month
              ),
              Sequelize.where(
                Sequelize.fn("YEAR", Sequelize.col("createdAt")),
                year
              ),
            ],
            batchId: batchId,
          },
        });
        // push the result array
        result.push({ year, month, count: rows });
      }
    }

    return result;
  } catch (err) {
    throw err;
  }
};

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

// band score by student id
studentUtil.bandScore = async (studentId) => {
  try {
    const marks = await mockTestMarks.findAll({
      where: { studentId },
      attributes: [
        [
          Sequelize.fn("AVG", Sequelize.col("listeningBands")),
          "listeningBands",
        ],
        [Sequelize.fn("AVG", Sequelize.col("readingBands")), "readingBands"],
        [Sequelize.fn("AVG", Sequelize.col("writingBands")), "writingBands"],
        [Sequelize.fn("AVG", Sequelize.col("speakingBands")), "speakingBands"],
      ],
      raw: true,
    });
    return marks[0];
  } catch (err) {
    throw err;
  }
};

// GET by id
studentUtil.readById = async (studentId) => {
  try {
    let result = await student.findOne({
      where: {
        id: studentId,
      },
      include: {
        model: batch,
        attributes: ['name', 'id'],
        include: [
          { model: organization, attributes: ['name', 'id'] },
          { model: mockTest, attributes: ['name', 'id'] }
        ],
      }
    });
    if (result) {
      result = result.get({ plain: true });
    }
    delete result?.password;
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
