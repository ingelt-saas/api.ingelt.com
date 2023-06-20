const { Op, literal } = require('sequelize');
const { studentApplied, student, organisation } = require('../models');
const appliedStudentsUtils = {};

// create
appliedStudentsUtils.create = async (data) => {
    try {
        const result = await studentApplied.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get all applied students
appliedStudentsUtils.getAllAppliedStudents = async (pageNo, limit, searchQuery) => {
    try {

        let where = {};
        if (searchQuery) {
            where = {
                where: {
                    [Op.or]: [
                        { '$student.name': { [Op.like]: `%${searchQuery}%` }, },
                        { '$student.email': { [Op.like]: `%${searchQuery}%` }, },
                    ]
                }
            }
        }

        const result = await studentApplied.findAndCountAll({
            ...where,
            include: [
                {
                    model: student,
                    required: true,
                    as: 'student',
                    attributes: {
                        exclude: ['password']
                    }
                },
                {
                    model: organisation,
                    attributes: ['name', 'id'],
                    required: true
                }
            ],
            order: [

                literal(`FIELD(studentApplied.status, ${['applied', 'accepted'].map(s => `'${s}'`).join(',')})`),
                ['createdAt', 'DESC'],
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

// get all applied students by org
appliedStudentsUtils.getAll = async (orgId, pageNo, limit) => {
    try {
        const result = await student.findAndCountAll({
            include: {
                model: studentApplied,
                required: true,
                where: {
                    organizationId: orgId,
                    status: 'applied'
                },
            },
            offset: (pageNo - 1) * limit,
            limit: limit,
        });
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

// a
appliedStudentsUtils.readById = async (id) => {
    try {
        let result = await studentApplied.findByPk(id);
        if (result) {
            result = result.get({ plain: true });
        }
        return result;
    } catch (err) {
        throw err;
    }
}

// // accept student
// appliedStudentsUtils.acceptStudent = async (orgId, studentId) => {
//     try {
//         const result = await studentApplied.update({ status: 'accepted' }, {
//             where: {
//                 organizationId: orgId,
//                 studentId: studentId,
//             }
//         });
//         return result;
//     } catch (err) {
//         throw err;
//     }
// }

// accept student
appliedStudentsUtils.acceptStudent = async (id) => {
    try {
        const result = await studentApplied.update({ status: 'accepted' }, {
            where: {
                id: id,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// get applied institutes by student 
appliedStudentsUtils.appliedInstitutes = async (studentId) => {
    try {
        const result = await studentApplied.findAll({
            where: {
                studentId: studentId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = appliedStudentsUtils;