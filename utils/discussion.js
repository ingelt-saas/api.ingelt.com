const { literal } = require("sequelize");
const { discussion, teacher, student, discussionImages } = require("../models");
const discussionUtil = {};
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

//Read Discussion
discussionUtil.read = async (pageNo, limit) => {
  try {

    // delete message
    const twentyFourHoursAgo = moment().subtract(24, "hours");
    await discussion.destroy({
      where: {
        createdAt: {
          [Op.lt]: twentyFourHoursAgo,
        },
      },
    });

    // delete discussion images
    console.log(await discussionImagesUtil.deleteImages());

    const result = await discussion.findAndCountAll({
      include: [
        { model: teacher, as: "teacherSender", attributes: [] },
        { model: student, as: "studentSender", attributes: [] },
      ],
      attributes: [
        'id', 'message', 'designation', 'senderId', 'createdAt',
        [literal('CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `name` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `name` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'), 'senderName'],
        [literal('CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `image` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `image` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'), 'senderImage'],
        [literal('CASE WHEN `discussion`.`designation` = "teacher" THEN (SELECT `country` FROM `teachers` WHERE `teachers`.`id` = `discussion`.`senderId`) ELSE (SELECT `country` FROM `students` WHERE `students`.`id` = `discussion`.`senderId`) END'), 'senderCountry'],
      ],
      include: {
        model: discussionImages,
        required: false,
      },
      order: [['createdAt', 'ASC']],
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
