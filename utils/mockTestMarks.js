const { Op } = require("sequelize");
const { mockTestMarks, student, batch, organisation, mockTest } = require("../models");
const mockTestMarksUtil = {};

// POST
mockTestMarksUtil.create = async (newMockTestMarks) => {
  try {
    const result = await mockTestMarks.create(newMockTestMarks);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all MockTestMarks by MockTestID
mockTestMarksUtil.getMockTestMarksByMockTest = async (mockTestId) => {
  try {
    const result = await mockTestMarks.findAll({
      where: {
        mockTestId: mockTestId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get mock test marks by student id
mockTestMarksUtil.getMockTestMarksByStudent = async (studentId) => {
  try {
    const result = await mockTestMarks.findAll({
      where: {
        studentId: studentId,
      },
      include: {
        model: mockTest,
        required: true,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get mock test marks and student details by mock test id
mockTestMarksUtil.getTestMarksWithStudent = async (mockTestId, orgId, pageNo, limit, searchQuery) => {
  try {

    let findQuery;
    if (searchQuery) {
      findQuery = {
        organizationId: orgId,
        active: true,
        batchId: { [Op.not]: null },
        name: { [Op.like]: `%${searchQuery}%` }
      };
    } else {
      findQuery = {
        organizationId: orgId,
        active: true,
        batchId: { [Op.not]: null },
      };
    }

    const result = await student.findAndCountAll({
      where: findQuery,
      include: [
        {
          model: mockTestMarks,
          required: false,
          where: {
            mockTestId: mockTestId,
          }
        }
      ],
      attributes: ['name', 'email', 'image', 'id'],
      offset: (pageNo - 1) * limit,
      limit: limit,
      order: [[{ model: mockTestMarks }, 'updatedAt', 'ASC']],
    });
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

// search mock test marks by student name
mockTestMarksUtil.searchByStudent = async ({ mockTestId, pageNo, limit, orgId, searchQuery }) => {
  try {
    const result = await student.findAndCountAll({
      where: {
        name: { [Op.like]: `%${searchQuery}%` }
      },
      include: [
        {
          model: batch,
          required: true,
          attributes: [],
          include: {
            model: organisation,
            required: true,
            where: {
              id: orgId,
            }
          }
        },
        {
          model: mockTestMarks,
          required: false,
          where: {
            mockTestId: mockTestId,
          }
        }
      ],
      attributes: ['name', 'email', 'image', 'id'],
      offset: (pageNo - 1) * limit,
      limit: limit,
      order: [[{ model: mockTestMarks }, 'updatedAt', 'ASC']],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// UPDATE
mockTestMarksUtil.update = async (mockTestMarksId, updateData) => {
  try {
    const result = await mockTestMarks.update(updateData, {
      where: {
        id: mockTestMarksId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// delete by mock id
mockTestMarksUtil.deleteByMockId = async (mockId) => {
  try {
    const result = await mockTestMarks.destroy({
      where: {
        mockTestId: mockId,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = mockTestMarksUtil;
