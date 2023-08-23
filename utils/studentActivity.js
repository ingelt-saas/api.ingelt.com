const { Op, literal } = require("sequelize");
const { studentActivity, student, sequelize, Sequelize } = require("../models");

const studentActivityUtil = {};

// get all active students
studentActivityUtil.getStudentActivity = async (year, month) => {
    try {
        const result = await studentActivity.findAll({
            attributes: [
                [sequelize.fn('date', sequelize.col('createdAt')), 'date'], // Extract the date part from createdAt
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('studentId'))), 'studentCount'], // Count the students
            ],
            where: sequelize.literal(` YEAR(createdAt) = ${year} AND MONTH(createdAt) = ${month}`),
            group: [sequelize.fn('date', sequelize.col('createdAt'))], // Group by date

        });
        return result;
    } catch (err) {
        throw err;
    }
}

// get spend hour by date
studentActivityUtil.getSpendHours = async (date) => {
    try {
        const result = await studentActivity.findAll({
            attributes: [
                'studentId',
                [Sequelize.fn('TIMESTAMPDIFF', Sequelize.literal('HOUR'), Sequelize.col('createdAt'), Sequelize.col('endDate')), 'hoursDifference'],
            ],
            group: 'studentId',
        });

        const totalHoursByStudent = {};
        result.forEach(row => {
            const { studentId, hoursDifference } = row.dataValues;
            if (!totalHoursByStudent[studentId]) {
                totalHoursByStudent[studentId] = 0;
            }
            totalHoursByStudent[studentId] += hoursDifference;
        });
    } catch (err) {
        throw err;
    }
}

// get students by id
studentActivityUtil.getStudentsByDate = async (date) => {
    try {
        date = new Date(date);
        const date2 = new Date(date);
        date2.setDate(date2.getDate() + 1);

        const result = await studentActivity.findAll({
            where: {
                createdAt: {
                    [Op.between]: [date, date2],
                }
            },
            attributes: ['studentId'],
            group: 'studentId',
        });

        const studentIds = result.map(i => i.dataValues.studentId && i.dataValues.studentId);

        const students = await student.findAll({
            where: {
                id: studentIds,
            },
            attributes: ['id', 'name', 'image', 'email', 'gender']
        });

        return students;
    } catch (err) {
        throw err;
    }
}

// get activities by student and year and month
studentActivityUtil.getActivitiesByStudent = async (studentId, year, month) => {
    try {
        const result = await studentActivity.findAll({
            where: {
                studentId: studentId,
                [Op.and]: [
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), year),
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), month)
                ]
            },
            attributes: [
                'studentId',
                [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
                // [Sequelize.fn('TIMESTAMPDIFF', Sequelize.literal('SECONDS'), Sequelize.col('createdAt'), Sequelize.col('endDate')), 'seconds'],
                [Sequelize.literal('SUM(TIMESTAMPDIFF(SECOND, createdAt, endDate))'), 'totalSeconds']
            ],
            group: ['date']
        });

        const getStudent = await student.findOne({
            attributes: ['name', 'id', 'email', 'image', 'gender'],
            where: { id: studentId }
        });

        return { activities: result, student: getStudent };

    } catch (err) {
        console.log(err);
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