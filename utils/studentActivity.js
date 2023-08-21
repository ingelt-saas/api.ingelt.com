const { studentActivity, student } = require("../models");

const studentActivityUtil = {};

// get all active students
studentActivityUtil.getActiveStudents = async () => {
    try {
        const result = await studentActivity.findAndCountAll({
            where: { active: true },
            include: {
                model: student,
                required: true,
                attributes: ['name', 'email', 'id', 'image'],
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// update online status
studentActivityUtil.updateOnlineStatus = async (studentId) => {
    try {

        // Find rows updated within the last 30 seconds
        const thirtySecondsAgo = new Date(Date.now() - 30000); // 30 seconds ago

        // update active status false
        await studentActivity.update({ active: false }, {
            where: {
                updatedAt: {
                    [Op.gte]: new Date(Date.now() - 50000), // Greater than or equal to thirtySecondsAgo
                }
            }
        });


        const getResult = await studentActivity.findOne({
            where: {
                studentId: studentId,
                updatedAt: {
                    [Op.gte]: thirtySecondsAgo, // Greater than or equal to thirtySecondsAgo
                },
            }
        });

        if (getResult) {
            const getRow = getResult.get();
            const result = await studentActivity.update({ active: true }, {
                where: {
                    id: getRow.id,
                }
            });
            return result;
        } else {
            const result = await studentActivity.create({ studentId: studentId });
            return result;
        }

    } catch (err) {
        throw err;
    }
}


module.exports = studentActivityUtil;