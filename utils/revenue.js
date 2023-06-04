const { Op } = require("sequelize");
const { revenue, Sequelize } = require("../models");

const revenueUtil = {};

// create revenue
revenueUtil.create = async (data) => {
    try {
        const result = await revenue.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get total revenue by year
revenueUtil.getTotalRevenue = async (orgId, year) => {
    try {
        const walkInRevenue = await revenue.findAll({
            where: {
                [Op.and]: [
                    { organizationId: orgId },
                    { studentType: 'walk-in' },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('revenue.createdAt')), year)
                ]
            },
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('orgFee')), 'totalRevenue']
            ],
            plain: true
        });

        const inGeltRevenue = await revenue.findAll({
            where: {
                [Op.and]: [
                    { organizationId: orgId },
                    { studentType: 'ingelt' },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('revenue.createdAt')), year)
                ]
            },
            attributes: [
                [Sequelize.literal('SUM(orgFee - (orgFee * (inGeltCommission / 100)))'), 'totalRevenue']
            ],
            plain: true,
        });

        return {
            walkInRevenue: walkInRevenue ? walkInRevenue.getDataValue('totalRevenue') : 0,
            inGeltRevenue: inGeltRevenue ? inGeltRevenue.getDataValue('totalRevenue') : 0,
        };
    } catch (err) {
        throw err;
    }
}

// get walk-in revenue by organization
revenueUtil.getWalkInRevenue = async (orgId, year) => {
    try {
        const walkInRevenue = await revenue.findAll({
            where: {
                [Op.and]: [
                    { organizationId: orgId },
                    { studentType: 'walk-in' },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('revenue.createdAt')), year)
                ]
            },
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('orgFee')), 'revenue'],
                [Sequelize.fn("MONTH", Sequelize.col("revenue.createdAt")), "month"],
            ],
            group: ["month"],
        });
        return walkInRevenue;
    } catch (err) {
        throw err;
    }
}

// get inGelt revenue by organization
revenueUtil.getInGeltRevenue = async (orgId, year) => {
    try {
        const inGeltRevenue = await revenue.findAll({
            where: {
                [Op.and]: [
                    { organizationId: orgId },
                    { studentType: 'ingelt' },
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('revenue.createdAt')), year)
                ]
            },
            attributes: [
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%c'), 'month'],
                [Sequelize.fn('SUM', Sequelize.literal('orgFee - (orgFee * (inGeltCommission / 100))')), 'revenue']
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%c')]
            // attributes: [
            //     [Sequelize.fn('ROUND', Sequelize.literal('orgFee - (orgFee * (inGeltCommission / 100))'), 2), 'revenue'],
            //     [Sequelize.fn("MONTH", Sequelize.col("revenue.createdAt")), "month"],
            // ],
            // group: ["month"],
        });
        return inGeltRevenue;
    } catch (err) {
        throw err;
    }
}

module.exports = revenueUtil;