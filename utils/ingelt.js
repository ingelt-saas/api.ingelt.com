const { inGelt } = require('../models');
const inGeltUtil = {};

// ready by email
inGeltUtil.readByEmail = async (email) => {
    try {
        let result = await inGelt.findOne({
            where: {
                email: email,
            }
        });
        if (result) {
            result = result.get({ plain: true });
        }
        return result;
    } catch (err) {
        throw err;
    }
}

// ready by id
inGeltUtil.readById = async (id) => {
    try {
        return result = await inGelt.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            },
        });
    } catch (err) {
        throw err;
    }
}


module.exports = inGeltUtil;