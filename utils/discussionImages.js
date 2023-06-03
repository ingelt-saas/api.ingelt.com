const { Op } = require("sequelize");
const { discussionImages } = require("../models");
const moment = require('moment');
const deleteFile = require("../aws/delete");
const discussionImagesUtil = {};

// create discussion images
discussionImagesUtil.create = async (data) => {
    try {
        const result = await discussionImages.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// delete discussion images
discussionImagesUtil.deleteImages = async () => {
    try {
        const twentyFourHoursAgo = moment().subtract(24, "hours");
        const getImages = await discussionImages.findAll({
            where: {
                createdAt: {
                    [Op.gt]: twentyFourHoursAgo,
                },
            },
            raw: true,
        });
        for (let image of getImages) {
            await deleteFile(image.image);
            await discussionImages.destroy({
                where: {
                    id: image.id,
                }
            });
        }
        return getImages
    } catch (err) {
        throw err;
    }
}

module.exports = discussionImagesUtil;