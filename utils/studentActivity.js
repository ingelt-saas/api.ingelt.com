const { Op, literal } = require("sequelize");
const { studentActivity, student, sequelize, Sequelize } = require("../models");

const studentActivityUtil = {};

// get all active students
studentActivityUtil.getActiveStudents = async (year, month) => {
    try {
        const result = await studentActivity.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('createdAt')), 'date'], // Extract the date part from createdAt
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('studentId'))), 'studentCount'], // Count the students
            ],
            where: sequelize.literal(` YEAR(createdAt) = ${year} AND MONTH(createdAt) = ${month} AND active = 1`),
            group: [sequelize.fn('date', sequelize.col('createdAt'))], // Group by date

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
        const thirtySecondsAgo = new Date(Date.now() - 60000); // 30 seconds ago


        const getResult = await studentActivity.findOne({
            where: {
                active: true,
                studentId: studentId,
                updatedAt: {
                    [Op.gte]: thirtySecondsAgo, // Greater than or equal to thirtySecondsAgo
                },
            }
        });

        if (getResult) {
            const getRow = getResult.get();
            const result = await studentActivity.update({ active: true, endDate: Date.now() }, {
                where: {
                    id: getRow.id,
                }
            });
            return result;
        } else {
            const result = await studentActivity.create({ studentId: studentId, endDate: Date.now() });
            return result;
        }

    } catch (err) {
        throw err;
    }
}

// update offline status
studentActivityUtil.updateOfflineStatus = async () => {
    try {
        // console.log(false);
        // update active status false
        const result = await studentActivity.update({ active: false }, {
            where: {
                active: true,
                updatedAt: {
                    [Op.lte]: new Date(Date.now() - 50000), // Greater than or equal to fifty second ago
                }
            }
        });
        console.log(result)
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = studentActivityUtil;