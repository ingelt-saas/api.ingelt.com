const { Op } = require('sequelize');
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
// read by id
universityUtil.readyById = async (universityId) => {
    try {
        let result = await university.findByPk(universityId);
        if (result) {
            result = result.get({ plain: true });
        }
        return result;
    } catch (err) {
        throw err;
    }
}

// get university  with shortlist by student
universityUtil.universityWithShortlist = async (studentId, pageNo, limit, country = null, course = null, areaOfInterest = null) => {
    try {

        const result = await university.findAndCountAll({
            where: {
                address: { [country ? Op.like : Op.notLike]: `%${country}%` },
                courseName: { [course ? Op.like : Op.notLike]: `%${course}%` },
                areaOfInterest: { [areaOfInterest ? Op.like : Op.notLike]: [areaOfInterest] },
            },
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
        console.log(err)
        throw err;
    }
}

// update university / TODO

// delete university / TODO
universityUtil.delete = async (universityId) => {
    try {
        const result = await university.destroy({
            where: {
                id: universityId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = universityUtil;