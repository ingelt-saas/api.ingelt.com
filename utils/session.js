const { session, student } = require("../models");

const sessionUtil = {};

// create
sessionUtil.create = async (data) => {
    try {
        const result = await session.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get all sessions
sessionUtil.getSessions = async () => {
    try {
        const result = await session.findAll({
            include: [
                {
                    model: student,
                    required: true,
                    attributes: ['id', 'name', 'email', 'phoneNo']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// get sessions by student
sessionUtil.getByStudent = async (studentId) => {
    try {
        const result = await session.findAll({
            where: {
                studentId: studentId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// update
sessionUtil.update = async (sessionId, updatedData) => {
    try {
        const result = await session.update(updatedData, {
            where: {
                id: sessionId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// delete
sessionUtil.delete = async (sessionId) => {
    try {
        const result = await session.destroy({
            where: {
                id: sessionId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = sessionUtil;