const { Op } = require("sequelize");
const { organization, studentApplied, orgImages, organisation, batch, student, Sequelize } = require("../models");
const organizationUtil = {};

// POST
organizationUtil.create = async (newOrganization) => {
  try {
    
    let result = await organization.create(newOrganization);
    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
};

// GET all
organizationUtil.read = async () => {
  try {

    let organizations = await organization.findAll({
      order: [["name", "ASC"]]
    });

    const resultArr = [];

    // get org images
    for (let org of [...organizations]) {
      const result = await orgImages.findAll({
        where: {
          organizationId: org.id,
        }
      });
      org.images = result;
      resultArr.push(org);
    }

    return resultArr;
  } catch (err) {
    throw err;
  }
};

// GET by id
organizationUtil.readById = async (organizationId) => {
  try {
    let result = await organization.findByPk(organizationId);
    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
};

// apply
organizationUtil.apply = async (data) => {
  try {
    const result = await studentApplied.create(data);
    return result;
  } catch (err) {
    throw err;
  }
};

// search organization
organizationUtil.search = async (value) => {
  try {
    const result = await organization.findAll({
      where: {
        name: { [Op.like]: `%${value}%` },
      },
      include: {
        model: orgImages,
        required: false,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// total revenue
organizationUtil.totalRevenueByOrg = async (orgId) => {
  try {
    const organization = await organizationUtil.readById(orgId);

    const inGeltStudents = await student.count({
      include: [
        {
          model: batch,
          required: true,
          include: {
            model: organisation,
            required: true,
            where: {
              id: orgId,
            }
          }
        },
        { model: studentApplied, required: true, where: { organizationId: orgId, status: 'accepted' } }
      ]
    });

    const walkInStudents = await student.count({
      include: [
        {
          model: batch,
          required: true,
          include: {
            model: organisation,
            required: true,
            where: {
              id: orgId,
            }
          }
        },
        { model: studentApplied, required: false, as: 'studentApplieds' }
      ],
      where: {
        '$studentApplieds.id$': null,
      },
    });

    const returnObj = { inGeltRevenue: 0, walkInRevenue: 0 };

    if (walkInStudents && organization.fee) {
      returnObj.walkInRevenue = (walkInStudents * organization.fee);
    }

    if (inGeltStudents && organization.fee && organization.commission) {
      returnObj.inGeltRevenue = (inGeltStudents * organization.fee) - ((inGeltStudents * organization.fee) / 100 * organization.commission);
    }

    return returnObj;
  } catch (err) {
    throw err;
  }
}

// walk-in revenue by org
organizationUtil.walkInRevenueByOrg = async (orgId, year) => {
  try {
    const organization = await organizationUtil.readById(orgId);

    let result = await student.findAll({
      where: {
        [Op.and]: [
          { '$studentApplieds.id$': null },
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('student.createdAt')), year)
        ]
      },
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('student.createdAt')), 'month'],
        [Sequelize.fn('COUNT', 'student.*'), 'count'],
      ],
      include: [
        {
          model: batch,
          required: true,
          attributes: [],
          include: {
            model: organisation,
            where: { id: orgId },
            required: true,
            attributes: [],
          },
        },
        { model: studentApplied, required: false, as: 'studentApplieds', attributes: [] }
      ],
      group: ['month'],
    });

    const resultArr = [];

    for (let item of result) {
      item = item.get({ plain: true });
      let count = item.count;
      count = (count * organization.fee);
      resultArr.push({ month: item.month, revenue: count });
    }
    return resultArr;
  } catch (err) {
    throw err;
  }
}

// ingelt revenue by org
organizationUtil.inGeltRevenueByOrg = async (orgId, year) => {
  try {
    const organization = await organizationUtil.readById(orgId);

    let result = await student.findAll({
      where: {
        [Op.and]: [
          Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('student.createdAt')), year)
        ]
      },
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('student.createdAt')), 'month'],
        [Sequelize.fn('COUNT', 'student.*'), 'count'],
      ],
      include: [
        {
          model: batch,
          required: true,
          attributes: [],
          include: {
            model: organisation,
            where: { id: orgId },
            required: true,
            attributes: [],
          },
        },
        { model: studentApplied, required: true, where: { status: 'accepted' } }
      ],
      group: ['month'],
    });

    const resultArr = [];

    for (let item of result) {
      item = item.get({ plain: true });
      let count = item.count;
      const revenue = (count * organization.fee) - ((count * organization.fee) / 100 * organization.commission);
      resultArr.push({ month: item.month, revenue: revenue });
    }

    return resultArr;
  } catch (err) {
    throw err;
  }
}

// PUT
organizationUtil.update = async (organizationId, updateData) => {
  try {
    const result = await organization.update(updateData, {
      where: {
        id: organizationId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// DELETE
organizationUtil.delete = async (organizationId) => {
  try {
    const result = await organization.destroy({
      where: {
        id: organizationId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = organizationUtil;
