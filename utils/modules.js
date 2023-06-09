const { Op } = require('sequelize');
const { modules } = require('../models');
const moduleUtil = {};

moduleUtil.getModules = async (pageNo, limit, subject, searchQuery) => {
    try {
        const sub = subject === 'all' ? ['reading', 'writing', 'speaking', 'listening'] : subject;
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

module.exports = moduleUtil;