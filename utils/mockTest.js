const { Sequelize, literal } = require("sequelize");
const { mockTest, mockTestMarks, batch, organisation, teacher, admin } = require("../models");
const mockTestUtil = {};

// POST
mockTestUtil.create = async (newMockTest) => {
  try {
    let name = newMockTest.name;
    name = name.charAt(0).toUpperCase() + name.slice(1);
    newMockTest.name = name;
    const result = await mockTest.create(newMockTest);
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get mock test by org and teacher
mockTestUtil.getByTeacher = async (teacherId) => {
  try {
    const result = await mockTest.findAll({
      where: {
        uploaderId: teacherId,
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

// get by organization
mockTestUtil.getByOrg = async (orgId) => {
  try {
    const result = await mockTest.findAll({
      include: [
        { model: teacher, as: 'teacherUploader', attributes: [] },
        { model: admin, as: 'adminUploader', attributes: [] },
      ],
      attributes: [
        'id', 'name', 'createdAt', 'uploaderId',
        [literal('CASE WHEN `mockTest`.`uploaderType` = "Teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `mockTest`.`uploaderId`) ELSE (SELECT `name` FROM `admins` WHERE `admins`.`id` = `mockTest`.`uploaderId`) END'), 'uploaderName'],
        [literal('CASE WHEN `mockTest`.`uploaderType` = "Teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `mockTest`.`uploaderId`) ELSE (SELECT `image` FROM `admins` WHERE `admins`.`id` = `mockTest`.`uploaderId`) END'), 'uploaderImage'],
      ],
      where: {
        organizationId: orgId,
      },
      order: [['createdAt', 'DESC']]
    });
    return result;
  } catch (err) {
    console.log(err)
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

// ready by name and organization
mockTestUtil.readByName = async (name, orgId) => {
  try {
    const result = await mockTest.findOne({
      where: {
        name: name, organizationId: orgId
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

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
