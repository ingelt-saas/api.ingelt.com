const { Sequelize } = require("sequelize");
const { mockTest, mockTestMarks, batch, organisation } = require("../models");
const mockTestUtil = {};

// POST
mockTestUtil.create = async (newMockTest) => {
  try {
    const result = await mockTest.create(newMockTest);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get mock test by org and teacher
mockTestUtil.getMockTestsByTeaAndOrg = async (orgId, teacherId) => {
  try {
    const result = await mockTest.findAll({
      where: {
        organizationId: orgId,
        teacherId: teacherId,
      },
      order: [['createdAt', 'DESC']]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// GET all Mocktests by batch
mockTestUtil.getMockTestsByBatch = async (batchId) => {
  try {
    const result = await mockTest.findAll({
      where: {
        batchId: batchId,
      },
      order: [['id', 'DESC']]
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// get mocktest by teacher and batch 
mockTestUtil.getMockTestsByTeaAndBatch = async (teacherId, batchId) => {
  try {
    const result = await mockTest.findAll({
      where: {
        teacherId: teacherId,
        batchId: batchId,
      },
      order: [['createdAt', 'DESC']]
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// get mock test and avg band
mockTestUtil.mockTestAvgBand = async (batchId, orgId) => {
  try {

    const mockTests = await mockTest.findAll({
      where: { batchId: batchId },
      include: [{
        model: batch,
        where: { id: batchId },
        required: true,
        attributes: [],
        include: { model: organisation, where: { id: orgId }, required: true, attributes: [] }
      }],
      raw: true
    });
    let newMockTestArr = [];

    for (let test of mockTests) {
      const testMarks = await mockTestMarks.findAll({
        where: { mockTestId: test.id },
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('listeningBands')), 'listeningBands'],
          [Sequelize.fn('AVG', Sequelize.col('readingBands')), 'readingBands'],
          [Sequelize.fn('AVG', Sequelize.col('writingBands')), 'writingBands'],
          [Sequelize.fn('AVG', Sequelize.col('speakingBands')), 'speakingBands'],
        ]
      });

      newMockTestArr.push({ ...test, testMarks: testMarks[0] });
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
