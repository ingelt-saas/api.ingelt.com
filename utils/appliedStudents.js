const { studentApplied, student } = require('../models');
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

// accept student
appliedStudentsUtils.acceptStudent = async (orgId, studentId) => {
    try {
        const result = await studentApplied.update({ status: 'accepted' }, {
            where: {
                organizationId: orgId,
                studentId: studentId,
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