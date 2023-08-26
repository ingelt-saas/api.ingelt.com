const {
  batch,
  organization,
  mockTest,
  teacher,
  organisation,
  mockTestMarks,
  submission,
  assignment,
  sequelize,
  studentApplied,
  student,
} = require("../models");
const bcrypt = require("bcrypt");
const { Sequelize, Op } = require("sequelize");
const studentUtil = {};

studentUtil.capitalizeAllWords = (str) => {
  return str.replace(/\b\w/g, (match) => {
    return match.toUpperCase();
  });
}

// Read all students from the database
studentUtil.readAll = async () => {
  try {
    const result = await student.findAll();
    return result;
  } catch (err) {
    throw err;
  }
};

// POST
studentUtil.create = async (newStudent) => {
  try {
    // Encrypt Password and Set it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newStudent.password, salt);
    newStudent.password = hashedPassword;

    let name = newStudent.name;
    name = studentUtil.capitalizeAllWords(name);
    newStudent.name = name;

    // const rollNumber = await studentUtil.generateRollNumber();
    // newStudent.roll = rollNumber;

    let result = await student.create(newStudent);

    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
};

// students under by org
studentUtil.readByOrg = async (orgId, pageNo, limit) => {
  try {
    const result = await student.findAndCountAll({
      include: {
        model: batch,
        required: true,
        attributes: ["name", "id"],
        include: {
          model: organisation,
          required: true,
          attributes: ["name", "id"],
          where: {
            id: orgId,
          },
        },
      },
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// students under by batch
studentUtil.readByBatch = async (batchId, pageNo, limit) => {
  try {
    const result = await student.findAndCountAll({
      include: {
        model: batch,
        required: true,
        where: {
          id: batchId,
        },
      },
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
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

// search students by teacher id
studentUtil.search = async (teacherId, searchValue) => {
  try {
    const result = await student.findAll({
      where: {
        name: { [Op.like]: `%${searchValue}%` },
      },
      include: {
        model: batch,
        required: true,
        attributes: [],
        include: {
          model: teacher,
          required: true,
          attributes: [],
          where: {
            id: teacherId,
          },
        },
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search students in all organization and student batchId is null
studentUtil.searchFreshStudentsByOrg = async (orgId, searchValue) => {
  try {
    const result = await student.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { name: { [Op.like]: `%${searchValue}%` } },
              { email: { [Op.like]: `%${searchValue}%` } },
            ],
          },
          { batchId: null },
          { organizationId: orgId },
          { active: true },
        ],
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search student by org
studentUtil.searchStuByOrg = async (orgId, searchQuery, pageNo, limit) => {
  try {
    const result = await student.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } },
          { email: { [Op.like]: `%${searchQuery}%` } },
          { phoneNo: { [Op.like]: `%${searchQuery}%` } },
        ],
      },
      include: {
        model: batch,
        required: true,
        attributes: ["name", "id"],
        include: {
          model: organisation,
          required: true,
          attributes: ["name", "id"],
          where: {
            id: orgId,
          },
        },
      },
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get total student in the organization
studentUtil.totalStudentsInTheOrg = async (orgId) => {
  try {
    const result = await student.count({
      where: {
        organizationId: orgId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get All Students in an Organization
studentUtil.allStuByOrgId = async (orgId, pageNo, limit) => {
  try {
    const result = await student.findAndCountAll({
      where: {
        organizationId: orgId,
      },
      attributes: ["name", "email", "id", "image", "gender", "phoneNo"],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// active students in the organization
studentUtil.activeStudents = async (
  orgId,
  pageNo,
  limit,
  searchQuery = null
) => {
  try {
    let search;

    if (searchQuery) {
      search = {
        [Op.and]: [
          { organizationId: orgId },
          { active: true },
          { batchId: { [Op.not]: null } },
          {
            [Op.or]: [
              { name: { [Op.like]: `%${searchQuery}%` } },
              { email: { [Op.like]: `%${searchQuery}%` } },
            ],
          },
        ],
      };
    } else {
      search = {
        organizationId: orgId,
        active: true,
        batchId: { [Op.not]: null },
      };
    }

    const result = await student.findAndCountAll({
      where: search,
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// inactive students in the organization
studentUtil.inactiveStudents = async (
  orgId,
  pageNo,
  limit,
  searchQuery = null
) => {
  try {
    let search;
    if (searchQuery) {
      search = {
        [Op.and]: [
          { organizationId: orgId },
          { active: false },
          { batchId: null },
          {
            [Op.or]: [
              { name: { [Op.like]: `%${searchQuery}%` } },
              { email: { [Op.like]: `%${searchQuery}%` } },
            ],
          },
        ],
      };
    } else {
      search = {
        organizationId: orgId,
        active: false,
        batchId: null,
      };
    }
    const result = await student.findAndCountAll({
      where: search,
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// fresh students in the organization
studentUtil.freshStudents = async (
  orgId,
  pageNo,
  limit,
  searchQuery = null
) => {
  try {
    let search;

    if (searchQuery) {
      search = {
        [Op.and]: [
          { organizationId: orgId },
          { active: true },
          { batchId: null },
          {
            [Op.or]: [
              { name: { [Op.like]: `%${searchQuery}%` } },
              { email: { [Op.like]: `%${searchQuery}%` } },
            ],
          },
        ],
      };
    } else {
      search = {
        organizationId: orgId,
        active: true,
        batchId: null,
      };
    }

    const result = await student.findAndCountAll({
      where: search,
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// passed students in the organization
studentUtil.passedStudents = async (
  orgId,
  pageNo,
  limit,
  searchQuery = null
) => {
  try {
    let search;

    if (searchQuery) {
      search = {
        [Op.and]: [
          { organizationId: orgId },
          { passed: true },
          {
            [Op.or]: [
              { name: { [Op.like]: `%${searchQuery}%` } },
              { email: { [Op.like]: `%${searchQuery}%` } },
            ],
          },
        ],
      };
    } else {
      search = {
        organizationId: orgId,
        passed: true,
      };
    }

    const result = await student.findAndCountAll({
      where: search,
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
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
          attributes: ["name", "id"],
          include: {
            model: organization,
            attributes: ["name", "id"],
            where: { id: orgId },
            required: true,
          },
        },
      ],
      attributes: {
        exclude: ["password"],
      },
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

// enrollment students by walk-in
studentUtil.enrollmentStudentByWalkIn = async (orgId, year) => {
  try {
    const result = await student.findAll({
      where: {
        [Op.and]: [
          { organizationId: orgId },
          { type: "walk-in" },
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("student.createdAt")),
            year
          ),
        ],
      },
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("student.createdAt")), "month"],
        [Sequelize.fn("COUNT", "student.*"), "count"],
      ],
      group: ["month"],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// enrollment students by ingelt
studentUtil.enrollmentStudentByInGelt = async (orgId, year) => {
  try {
    const result = await student.findAll({
      where: {
        [Op.and]: [
          { organizationId: orgId },
          { type: "ingelt" },
          Sequelize.where(
            Sequelize.fn("YEAR", Sequelize.col("student.createdAt")),
            year
          ),
        ],
      },
      attributes: [
        [sequelize.fn("MONTH", sequelize.col("student.createdAt")), "month"],
        [Sequelize.fn("COUNT", "student.*"), "count"],
      ],
      group: ["month"],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// enrollment student by organization
studentUtil.enrollmentStudentByOrg = async (orgId) => {
  try {
    const inGeltStudents = await student.count({
      where: {
        organizationId: orgId,
        type: "ingelt",
      },
    });

    const walkInStudents = await student.count({
      where: {
        organizationId: orgId,
        type: "walk-in",
      },
    });

    return { walkInStudents, inGeltStudents };
  } catch (err) {
    console.log(err);
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

// assignment attempted students
studentUtil.attemptedStudentsByOrg = async (orgId) => {
  try {
    const totalAssignments = await assignment.count({
      where: {
        organizationId: orgId,
      },
    });
    let result = await student.findAll({
      attributes: ["name", "id", "image"],
      include: [
        {
          model: batch,
          required: true,
          attributes: [],
          include: {
            model: organisation,
            required: true,
            attributes: [],
            where: {
              id: orgId,
            },
          },
        },
        {
          model: submission,
          attributes: ["id"],
        },
      ],
      order: [["name", "ASC"]],
    });

    const newResult = result.map((i) => ({
      ...i.dataValues,
      assignment: totalAssignments,
    }));

    return newResult;
  } catch (err) {
    throw err;
  }
};

// active student by organization
studentUtil.activeStudentsByOrg = async (orgId) => {
  try {
    const result = await student.count({
      where: {
        active: true,
        organizationId: orgId,
        batchId: { [Op.not]: null },
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

    let result = await student.findByPk(studentId, {
      include: [
        {
          model: batch,
          required: false,
          include: {
            model: organisation,
            attributes: ["name", "id"],
            include: { model: mockTest, attributes: ["name", "id"] },
          },
        },
        {
          model: organisation,
          required: false,
          attributes: ['name', 'id']
        }
      ],
    });

    const testAttempted = await mockTestMarks.count({
      where: {
        studentId: studentId,
      },
    });

    if (result) {
      result = result.get({ plain: true });
      result.testAttempted = testAttempted;
    }
    delete result?.password;
    return result;
  } catch (err) {
    throw err;
  }
};

// GET by email
studentUtil.readByEmail = async (email) => {
  try {
    const result = await student.findOne({ where: { email: email } });
    return result;
  } catch (err) {
    throw err;
  }
};

// update student by batch
studentUtil.updateStudentsByBatch = async (batchId, data) => {
  try {
    const result = await student.update(data, {
      where: {
        batchId: batchId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get all students for the ingelt godseye
studentUtil.readForInGelt = async (pageNo, limit, filter, searchQuery) => {
  try {

    let findQuery = {};
    if (searchQuery) {
      findQuery = {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { email: { [Op.like]: `%${searchQuery}%` } },
            { '$organization.name$': { [Op.like]: `%${searchQuery}%` } },
            { '$organization.email$': { [Op.like]: `%${searchQuery}%` } },
          ]
        }
      };
    }

    // filter query
    if (filter) {
      let filterQuery;

      if (filter === 'active') { // active students
        filterQuery = [
          { organizationId: { [Op.not]: null } },
          { active: true },
          { batchId: { [Op.not]: null } },
        ];
      } else if (filter === 'inactive') {
        filterQuery = [
          { organizationId: { [Op.not]: null } },
          { active: false },
          { batchId: null },
        ];
      } else if (filter === 'passed') {
        filterQuery = [
          { organizationId: { [Op.not]: null } },
          { passes: true },
        ];
      } else if (filter === 'fresh') {
        filterQuery = [
          { organizationId: { [Op.not]: null } },
          { active: true },
          { batchId: null },
        ];
      }

      if (Object.keys(findQuery).length > 0) {
        const prevQuery = findQuery.where;
        findQuery = {
          where: {
            [Op.and]: [
              ...filterQuery,
              prevQuery
            ]
          }
        };
      } else {
        findQuery = {
          where: {
            [Op.and]: [...filterQuery]
          }
        };
      }
    }

    const result = await student.findAndCountAll({
      ...findQuery,
      include: [
        {
          model: organisation,
          as: 'organization',
          attributes: ['name', 'id', 'email', 'address']
        }
      ],
      attributes: {
        exclude: ['password']
      },
      order: [['createdAt', 'DESC']],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

// search students
studentUtil.searchStudents = async (searchQuery) => {
  try {
    const result = await student.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchQuery}%` } },
          { email: { [Op.like]: `%${searchQuery}%` } },
          { id: { [Op.like]: `%${searchQuery}%` } },
        ]
      },
      attributes: ['name', 'email', 'id', 'image', 'gender']
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// PUT
studentUtil.update = async (studentId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = name.charAt(0).toUpperCase() + name.slice(1);
      updateData.name = name;
    }
    updateData.payment && delete updateData.payment;
    updateData.modulesUnlock && delete updateData.modulesUnlock;
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

// student module unlock
studentUtil.unlockModule = async (studentId) => {
  try {
    const result = await student.update({ modulesUnlock: true }, {
      where: {
        id: studentId,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

//update student status using a scheduler
studentUtil.updateStudentStatus = async () => {
  try {
    // Get all active students
    const activeStudents = await student.findAll();
    // Loop through each active student and update their status based on the duration
    for (const student of activeStudents) {
      const currentDate = new Date();
      const assignmentDate = student.batchAssignedDate; // Assuming you have an 'assignmentDate' field in the student model

      // Calculate the duration in milliseconds
      const duration45Days = 45 * 24 * 60 * 60 * 1000;

      if (assignmentDate && currentDate - assignmentDate >= duration45Days) {
        // Update the student's status after 45 days of assignment
        await student.update({ active: false, batchId: null });
      }
    }

    // // Get all inactive students
    const inactiveStudents = await student.findAll();

    // // Loop through each inactive student and update their 'passed' attribute after 55 days of inactivity
    for (const student of inactiveStudents) {
      const currentDate = new Date();
      const assignmentDate = student.batchAssignedDate; // Assuming you have an 'assignmentDate' field in the student model

      //   // Calculate the duration in milliseconds
      const duration55Days = 55 * 24 * 60 * 60 * 1000;

      if (assignmentDate && currentDate - assignmentDate >= duration55Days) {
        //     // Update the 'passed' attribute after 55 days of inactivity
        await student.update({ passed: true, active: false, batchId: null });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = studentUtil;
