const { literal } = require("sequelize");
const { discussion, teacher, student } = require("../models");
const discussionUtil = {};
const { Op } = require("sequelize");
const moment = require("moment");

// POST
discussionUtil.create = async (newDiscussion) => {
  try {
    const result = await discussion.create(newDiscussion);
    return result;
  } catch (err) {
    return err;
  }
};

discussionUtil.read = async (pageNo, limit) => {
  try {
    const twentyFourHoursAgo = moment().subtract(24, "hours");
    await discussion.destroy({
      where: {
        createdAt: {
          [Op.lt]: twentyFourHoursAgo,
        },
      },
    });
    const result = await discussion.findAndCountAll({
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
      ],
      order: [["createdAt", "DESC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

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
