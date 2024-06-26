const { literal } = require("sequelize");
const { discussion, teacher, student, discussionImages, discussionReport, sequelize } = require("../models");
const discussionUtil = {};
const studentUtil = require("./student");
const teacherUtil = require("./teacher");
const { Op } = require("sequelize");
const moment = require("moment");
const discussionImagesUtil = require("./discussionImages");

// POST
discussionUtil.create = async (newDiscussion) => {
  try {
    let result = await discussion.create(newDiscussion);
    result = result.get({ plain: true });
    return result;
  } catch (err) {
    return err;
  }
};

//count all the student and teacher from the database using the studentUtil and teacherUtil
discussionUtil.countAll = async () => {
  try {
    const studentCount = await studentUtil.readAll();
    const teacherCount = await teacherUtil.readAll();
    const totalNumber = studentCount.length + teacherCount.length + 548;
    const percentage = totalNumber * 0.23;
    const operators = ["+", "-"];
    const numbers = [1, 2, 3];

    const randomOperator =
      operators[Math.floor(Math.random() * operators.length)];
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    let online;
    if (randomOperator === "+") {
      online = percentage + randomNumber;
    } else {
      online = percentage - randomNumber;
    }
    result = { online: Math.ceil(online), totalMembers: totalNumber };

    return result;
  } catch (err) {
    throw err;
  }
};

//POST - get all discussions

// discussionUtil.read = async (pageNo, limit) => {
//   try {
//     const twentyFourHoursAgo = moment().subtract(24, "hours");
//     await discussion.destroy({
//       where: {
//         createdAt: {
//           [Op.lt]: twentyFourHoursAgo,
//         },
//       },
//     });
//     const result = await discussion.findAndCountAll({
//       include: [
//         { model: teacher, as: "teacherSender", attributes: [] },
//         { model: student, as: "studentSender", attributes: [] },
//       ],
//       attributes: [
//         'id', 'message', 'designation', 'senderId', 'createdAt',
//         [literal('CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `name` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'), 'senderName'],
//         [literal('CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `image` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'), 'senderImage'],
//         [literal('CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `country` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `country` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'), 'senderCountry'],
//       ],
//       order: [['createdAt', 'ASC']],
//       offset: (pageNo - 1) * limit,
//       limit: limit,
//     });
//     return result;
//   } catch (err) {
//     throw err;
//   }
// };

discussionUtil.read = async (pageNo, limit) => {
  try {
    const discussionCount = await discussion.count();
    if (discussionCount > 100) {
      const discussionsToDelete = discussionCount - 100;
      const discussions = await discussion.findAll({
        order: [["createdAt", "ASC"]],
        offset: discussionsToDelete,
      });
      const discussionIdsToDelete = discussions.map(
        (discussion) => discussion.id
      );
      await discussion.destroy({
        where: {
          id: {
            [Op.in]: discussionIdsToDelete,
          },
        },
      });
    }

    //Read Discussion
    // discussionUtil.read = async (pageNo, limit) => {
    //   try {

    //     // delete message
    //     const twentyFourHoursAgo = moment().subtract(24, "hours");
    //     await discussion.destroy({
    //       where: {
    //         createdAt: {
    //           [Op.lt]: twentyFourHoursAgo,
    //         },
    //       },
    //     });

    // delete discussion images
    //     await discussionImagesUtil.deleteImages()

    let result = await discussion.findAndCountAll({
      include: [
        { model: teacher, as: "teacherSender", attributes: [] },
        { model: student, as: "studentSender", attributes: [] },
        { model: discussionImages, separate: true, required: false },
        { model: discussionReport, separate: true, attributes: ['id', 'reporterId'], required: false },
        { model: discussion, as: 'ParentDiscussion', required: false }
      ],
      attributes: [
        "id",
        "message",
        "designation",
        "senderId",
        "createdAt",
        [sequelize.fn('DATE', sequelize.col('discussion.createdAt')), 'date'],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `name` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderName",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `image` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderImage",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `country` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `country` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderCountry",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `gender` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `gender` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderGender",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `verified` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `verified` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderVerified",
        ],
      ],
      order: [["createdAt", "DESC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });

    let resultArr = {};

    if (Array.isArray(result.rows)) {
      for (let item of result.rows) {
        item = item.get({ plain: true });
        if (resultArr[item.date]) {
          resultArr[item.date] = [...resultArr[item.date], item];
        } else {
          resultArr[item.date] = [item];
        }
      }
    }

    return { count: result.count, rows: resultArr };
  } catch (err) {
    throw err;
  }
};

// discussion read by id
discussionUtil.readById = async (id) => {
  try {
    const result = await discussion.findOne({
      where: {
        id: id,
      },
      include: [
        { model: teacher, as: "teacherSender", attributes: [] },
        { model: student, as: "studentSender", attributes: [] },
      ],
      attributes: [
        "id",
        "message",
        "designation",
        "senderId",
        "createdAt",
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `name` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderName",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `image` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderImage",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `country` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `country` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderCountry",
        ],
        [
          literal(
            'CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `gender` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `gender` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'
          ),
          "senderGender",
        ],
      ],
      include: {
        model: discussionImages,
        required: false,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// DELETE
discussionUtil.delete = async (discussionId) => {
  try {
    const result = await discussion.destroy({
      where: {
        id: discussionId,
      },
    });
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = discussionUtil;
