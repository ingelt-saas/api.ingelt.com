const { mockTestMarks, student, batch, organisation } = require("../models");
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
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get mock test marks and student details by mock test id
mockTestMarksUtil.getTestMarksWithStudent = async (mockTestId, orgId, pageno, limit) => {
  try {
    const result = await student.findAndCountAll({
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
      // offset: (0 + pageno - 1) * 0 + limit,
      // limit: limit,
      order: [[{ model: mockTestMarks }, 'updatedAt', 'ASC']],
    });
    return result;
  } catch (err) {
    console.log(err);
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

module.exports = mockTestMarksUtil;
