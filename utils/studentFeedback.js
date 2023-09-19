const { Op } = require("sequelize");
const { studentFeedback } = require("../models");

const studentFeedbackUtils = {};

// insert 
studentFeedbackUtils.create = async (data) => {
    try {
        const res = await studentFeedback.create(data);
        return res;
    } catch (err) {
        throw err;
    }
}

// get one by id
studentFeedbackUtils.getById = async (feedbackId) => {
    try {
        const res = await studentFeedback.findById(feedbackId);
        return res;
    } catch (err) {
        throw err;
    }
}

// get all
studentFeedbackUtils.getAll = async (page, limit, search) => {
    try {

        let searchQuery = {};

        if (search) {
            searchQuery = {
                where: {
                    [Op.or]: [
                        { studentName: { [Op.like]: `%${search}%` } },
                        { country: { [Op.like]: `%${search}%` } },
                        { visaType: { [Op.like]: `%${search}%` } }
                    ]
                }
            };
        }

        const res = await studentFeedback.findAndCountAll({
            ...searchQuery,
            offset: (page - 1) * limit,
            limit: limit,
            order: [['createdAt', 'DESC']]
        });
        return res;
    } catch (err) {
        throw err;
    }
}

module.exports = studentFeedbackUtils;