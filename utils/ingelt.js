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

// find one
inGeltUtil.getInGelt = async () => {
    try {
        const result = await inGelt.findOne({
            order: [['id', 'ASC']],
            raw: true
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// ready by id
inGeltUtil.readById = async (id) => {
    try {
        return await inGelt.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            },
        });
    } catch (err) {
        throw err;
    }
}

//update
inGeltUtil.update = async (id, updateData) => {
    try {
        return await inGelt.update(updateData, {
            where: { id: id },
        });
    } catch (err) {
        throw err;
    }
}


module.exports = inGeltUtil;