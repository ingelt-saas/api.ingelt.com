const { university, studentShortlist } = require('../models');
const universityUtil = {};

universityUtil.capitalizeAllWords = (str) => {
    return str.replace(/\b\w/g, (match) => {
        return match.toUpperCase();
    });
}

// create university
universityUtil.create = async (data) => {
    try {
        if (data.name) {
            data.name = universityUtil.capitalizeAllWords(data.name);
        }
        if (data.courseName) {
            data.courseName = universityUtil.capitalizeAllWords(data.courseName);
        }
        const result = await university.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// read all
universityUtil.read = async (pageNo, limit) => {
    try {
        const result = await university.findAndCountAll({
            order: [['name', 'ASC']],
            offset: (pageNo - 1) * limit,
            limit: limit,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// get university  with shortlist by student
universityUtil.universityWithShortlist = async (studentId, pageNo, limit) => {
    try {
        const result = await university.findAndCountAll({
            include: {
                model: studentShortlist,
                required: false,
                where: {
                    studentId: studentId,
                }
            },
            order: [['name', 'ASC']],
            offset: (pageNo - 1) * limit,
            limit: limit,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// update university / TODO

// delete university / TODO

module.exports = universityUtil;