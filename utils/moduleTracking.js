const { Op } = require("sequelize");
const { moduleTracking } = require("../models");

const moduleTrackingUtil = {};

// create
moduleTrackingUtil.create = async (data) => {
    try {
        const result = await moduleTracking.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// update module duration
moduleTrackingUtil.update = async (id, data) => {
    try {
        const result = await moduleTracking.update(data, {
            where: {
                id: id,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = moduleTrackingUtil;