const { literal } = require("sequelize");
const { discussionReport, student, teacher } = require("../models");

const discussionReportUtil = {};

// discussion report create
discussionReportUtil.create = async (data) => {
    try {
        const result = await discussionReport.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get reports by discussion id
discussionReportUtil.getReportsByDiscussion = async (discussionId) => {
    try {
        const result = await discussionReport.findAll({
            where: { discussionId: discussionId },
            include: [
                { model: teacher, as: 'teacherReporter', attributes: [] },
                { model: student, as: 'studentReporter', attributes: [] }
            ],
            attributes: [
                'id',
                'reporterDesignation',
                "createdAt",
                [
                    literal(
                        'CASE WHEN `discussionReport`.`reporterDesignation` = "teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `discussionReport`.`reporterId`) ELSE (SELECT `name` FROM `students` WHERE `students`.`id` = `discussionReport`.`reporterId`) END'
                    ),
                    "reporterName",
                ],
                [
                    literal(
                        'CASE WHEN `discussionReport`.`reporterDesignation` = "teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `discussionReport`.`reporterId`) ELSE (SELECT `image` FROM `students` WHERE `students`.`id` = `discussionReport`.`reporterId`) END'
                    ),
                    "reporterImage",
                ],
                [
                    literal(
                        'CASE WHEN `discussionReport`.`reporterDesignation` = "teacher" THEN (SELECT `country` FROM `teachers` WHERE `teachers`.`id` = `discussionReport`.`reporterId`) ELSE (SELECT `country` FROM `students` WHERE `students`.`id` = `discussionReport`.`reporterId`) END'
                    ),
                    "reporterCountry",
                ],
                [
                    literal(
                        'CASE WHEN `discussionReport`.`reporterDesignation` = "teacher" THEN (SELECT `gender` FROM `teachers` WHERE `teachers`.`id` = `discussionReport`.`reporterId`) ELSE (SELECT `gender` FROM `students` WHERE `students`.`id` = `discussionReport`.`reporterId`) END'
                    ),
                    "reporterGender",
                ],
            ],
            order: [['createdAt', 'DESC']],
        });
        return result;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

module.exports = discussionReportUtil;