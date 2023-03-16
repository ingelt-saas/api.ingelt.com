const { Sequelize } = require("sequelize");
const { mockTest, mockTestMarks } = require("../models");
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

// get mock test and avg band
mockTestUtil.mockTestAvgBand = async (batchId) => {
  try {

    const mockTests = await mockTest.findAll({ where: { batchId: batchId } });
    let newMockTestArr = [];

    for (let test of mockTests) {
      const testMarks = await mockTestMarks.findAll({
        where: { mockTestId: test.id },
        attributes: [
          [Sequelize.fn('sum', Sequelize.col('listeningBands')), 'listeningBands'],
          [Sequelize.fn('sum', Sequelize.col('readingBands')), 'readingBands'],
          [Sequelize.fn('sum', Sequelize.col('writingBands')), 'writingBands'],
          [Sequelize.fn('sum', Sequelize.col('speakingBands')), 'speakingBands'],
        ],
      });
      newMockTestArr.push({ ...test, ...testMarks });
    }

    // return mock test
    return newMockTestArr;

  } catch (err) {
    throw err;
  }
}

// GET by id
mockTestUtil.readById = async (mockTestId) => {
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
