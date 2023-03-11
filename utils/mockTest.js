import { mockTest } from "../models";
const mockTestUtil = {};

// POST
mockTestUtil.create = async (newMockTest) => {
  try {
    const result = await mockTest.create(newMockTest);
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all Mocktests by batch
mockTestUtil.getMockTestsByBatch = async (batchId) => {
  try {
    const result = await mockTest.findAll({
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
mockTestUtil.readById = async (mockTestId) => {
  const mockTestId = req.params.id;
  try {
    const result = await mockTest.findByPk(mockTestId);
    return result;
  } catch (err) {
    throw err;
  }
};

// PUT
mockTestUtil.update = async (mockTestId, updateData) => {
  try {
    const result = await mockTest.update(updateData, {
      where: {
        id: mockTestId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
mockTestUtil.delete = async (mockTestId) => {
  try {
    const result = await mockTest.destroy({
      where: {
        id: mockTestId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = mockTestUtil;
