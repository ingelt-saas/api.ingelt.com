const { Op } = require("sequelize");
const { studentShortlist, student, university } = require("../models");

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

// get all students shortlist
studentShortlistUtil.studentsShortlist = async (pageNo, limit, searchQuery) => {
    try {

        let findQuery = {};

        if (searchQuery) {
            findQuery = {
                where: {
                    [Op.or]: [
                        { '$student.name$': { [Op.like]: `%${searchQuery}%` } },
                        { '$student.email$': { [Op.like]: `%${searchQuery}%` } },
                        { '$university.name$': { [Op.like]: `%${searchQuery}%` } },
                        { '$university.courseName$': { [Op.like]: `%${searchQuery}%` } },
                    ]
                }
            }
        }

        const result = await studentShortlist.findAndCountAll({
            ...findQuery,
            include: [
                {
                    model: student,
                    as: 'student',
                    required: true,
                    attributes: ['name', 'id', 'image', 'dob', 'gender']
                },
                {
                    model: university,
                    as: 'university',
                    required: true
                }
            ],
            offset: (pageNo - 1) * limit,
            limit: limit,
        });
        return result;
    } catch (err) {
        console.log(err)
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