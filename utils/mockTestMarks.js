import { mockTestMarks } from "../models";
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
