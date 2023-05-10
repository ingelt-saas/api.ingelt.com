const { studentApplied, student } = require('../models');
const appliedStudentsUtils = {};

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

module.exports = appliedStudentsUtils;