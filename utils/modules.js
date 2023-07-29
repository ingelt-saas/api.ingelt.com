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
moduleUtil.getModules = async (pageNo, limit, type, searchQuery) => {
    try {

        let findQuery;
        if (searchQuery) {
            findQuery = {
                type: type,
                name: { [Op.like]: `%${searchQuery}%` }
            }
        } else {
            findQuery = {
                type: type,
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

// get modules for student
moduleUtil.getModulesForStudent = async (pageNo, limit, type, searchQuery) => {
    try {
        const moduleType = type === 'all' ? ['video', 'module_ppt', 'mock_test'] : type;
        let findQuery;
        if (searchQuery) {
            findQuery = {
                type: moduleType,
                name: { [Op.like]: `%${searchQuery}%` }
            }
        } else {
            findQuery = {
                type: moduleType,
            };
        }

        const result = await modules.findAndCountAll({
            where: findQuery,
            order: [['order', 'ASC']],
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
        return result;
    } catch (err) {
        throw err;
    }
}

// update module
moduleUtil.update = async (moduleId, updatedData) => {
    try {
        const result = await modules.update(updatedData, {
            where: {
                id: moduleId,
            }
        });
        return result;
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