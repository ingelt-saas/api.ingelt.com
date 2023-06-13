const { Op, or } = require("sequelize");
const {
  organization,
  studentApplied,
  orgImages,
  organisation,
  batch,
  student,
  Sequelize,
  admin,
} = require("../models");
const organizationUtil = {};

organizationUtil.capitalizeAllWords = (str) => {
  return str.replace(/\b\w/g, (match) => {
    return match.toUpperCase();
  });
}

// Post orgainzation with foam data
organizationUtil.create = async (newOrganization) => {
  try {
    let name = newOrganization.name;
    name = organizationUtil.capitalizeAllWords(name);
    newOrganization.name = name;

    let result = await organization.create(newOrganization);
    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
}

// GET all
organizationUtil.read = async (pageNo, limit, searchQuery) => {
  try {

    let findQuery = {};
    if (searchQuery) {
      findQuery = {
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${searchQuery}%` } },
            { ownerName: { [Op.like]: `%${searchQuery}%` } },
            { address: { [Op.like]: `%${searchQuery}%` } },
          ]
        }
      };
    }

    let result = await organisation.findAndCountAll({
      ...findQuery,
      include: {
        model: orgImages,
      },
      order: [["name", "ASC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// search organization
organizationUtil.searchInstitute = async (mode, location, searchQuery) => {
  try {

    const classMode = mode ? mode.split(',') : mode;

    let findQuery;
    if (mode || location || searchQuery) {
      findQuery = {
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                { name: { [Op.like]: `%${searchQuery}%` } },
                { address: { [Op.like]: `%${searchQuery}%` } },
              ]
            },
            { modeOfClasses: { [mode ? Op.in : Op.not]: classMode } },
            { state: { [location ? Op.eq : Op.not]: location } }
          ]
        }
      };
    }


    let result = await organisation.findAll({
      ...findQuery,
      include: {
        model: orgImages,
      },
      order: [["name", "ASC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
}

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
      },
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

    // const inGeltStudents = await student.count({
    //   where: {
    //     organizationId: orgId,
    //     type: "ingelt",
    //   },
    // });

    // const walkInStudents = await student.count({
    //   where: {
    //     organizationId: orgId,
    //     type: "walk-in",
    //   },
    // });

    // const returnObj = { inGeltRevenue: 0, walkInRevenue: 0 };

    // if (walkInStudents && organization.fee) {
    //   returnObj.walkInRevenue = walkInStudents * organization.fee;
    // }

    // if (inGeltStudents && organization.fee && organization.commission) {
    //   returnObj.inGeltRevenue =
    //     inGeltStudents * organization.fee -
    //     ((inGeltStudents * organization.fee) / 100) * organization.commission;
    // }

    const returnObj = {
      inGeltRevenue: organization.ingeltRevenue,
      walkInRevenue: organization.walkInRevenue,
    };

    return returnObj;
  } catch (err) {
    throw err;
  }
};

// walk-in revenue by org
organizationUtil.walkInRevenueByOrg = async (orgId, year) => {
  try {
    const organization = await organizationUtil.readById(orgId);

    let result = await student.findAll({
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
        [Sequelize.fn("MONTH", Sequelize.col("student.createdAt")), "month"],
        [Sequelize.fn("COUNT", "student.*"), "count"],
      ],
      group: ["month"],
    });

    const resultArr = [];

    for (let item of result) {
      item = item.get({ plain: true });
      let count = item.count;
      count = count * organization.fee;
      resultArr.push({ month: item.month, revenue: count });
    }
    return resultArr;
  } catch (err) {
    throw err;
  }
};

// ingelt revenue by org
organizationUtil.inGeltRevenueByOrg = async (orgId, year) => {
  try {
    const organization = await organizationUtil.readById(orgId);

    let result = await student.findAll({
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
        [Sequelize.fn("MONTH", Sequelize.col("student.createdAt")), "month"],
        [Sequelize.fn("COUNT", "student.*"), "count"],
      ],
      group: ["month"],
    });

    const resultArr = [];

    for (let item of result) {
      item = item.get({ plain: true });
      let count = item.count;
      const revenue =
        count * organization.fee -
        ((count * organization.fee) / 100) * organization.commission;
      resultArr.push({ month: item.month, revenue: revenue });
    }

    return resultArr;
  } catch (err) {
    throw err;
  }
};

// PUT
organizationUtil.update = async (organizationId, updateData) => {
  try {
    if (updateData.name) {
      let name = updateData.name;
      name = organizationUtil.capitalizeAllWords(name);
      updateData.name = name;
    }
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

// update WalkIn revenue
organizationUtil.walkInRevenueUpdate = async (organizationId) => {
  try {
    let neworganization = await organizationUtil.readById(organizationId);

    let revenue = neworganization.walkInRevenue + neworganization.fee;

    neworganization.walkInRevenue = revenue;

    const result = await organization.update(neworganization, {
      where: {
        id: organizationId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// update InGelt revenue
organizationUtil.ingeltRevenueUpdate = async (organizationId) => {
  try {
    let neworganisation = await organizationUtil.readById(organizationId);
    // inGeltStudents * organization.fee -
    //     ((inGeltStudents * organization.fee) / 100) * organization.commission;
    let revenue =
      neworganisation.fee -
      (neworganisation.fee / 100) * neworganisation.commission;

    neworganisation.inGeltRevenue = revenue;

    const result = await organization.update(neworganisation, {
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
