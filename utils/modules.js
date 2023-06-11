const { Op } = require('sequelize');
const { modules } = require('../models');
const moduleUtil = {};


moduleUtil.capitalizeAllWords = (str) => {
    return str.replace(/\b\w/g, (match) => {
        return match.toUpperCase();
    });
}

// create
moduleUtil.create = async (data) => {
    try {
        if (data.name) {
            data.name = moduleUtil.capitalizeAllWords(data.name);
        }
        const result = await modules.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get modules
moduleUtil.getModules = async (pageNo, limit, subject, searchQuery) => {
    try {
        const sub = subject === 'all' ? ['reading', 'writing', 'speaking', 'listening', 'all'] : subject;
        let findQuery;
        if (searchQuery) {
            findQuery = {
                subject: sub,
                name: { [Op.like]: `%${searchQuery}%` }
            }
        } else {
            findQuery = {
                subject: sub,
            };
        }

        const result = await modules.findAndCountAll({
            where: findQuery,
            order: [['createdAt', 'DESC']],
            offset: (pageNo - 1) * limit,
            limit: limit,
        });

        return result;
    } catch (err) {
        throw err;
    }
}

//read by id
moduleUtil.readById = async (moduleId) => {
    try {
        let result = await modules.findByPk(moduleId);
        if (result) {
            result = result.get({ plain: true });
        }
    } catch (err) {
        throw err;
    }
}

// delete modules
moduleUtil.delete = async (moduleId) => {
    try {
        const result = await modules.destroy({
            where: {
                id: moduleId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = moduleUtil;