const { studentShortlist } = require("../models");

const studentShortlistUtil = {};

// create 
studentShortlistUtil.create = async (data) => {
    try {
        const result = await studentShortlist.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// delete
studentShortlistUtil.delete = async (studentId, universityId) => {
    try {
        const result = await studentShortlist.destroy({
            where: {
                studentId,
                universityId
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = studentShortlistUtil;