const { revenue } = require("../models");

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

// get walk-in revenue by organization
revenueUtil.getWalkInRevenue = async (orgId) => {
    try {
        const result = await revenue.findAll({});
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = revenueUtil;