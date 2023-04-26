const { orgImages } = require("../models");
const orgImagesUtils = {};

// insert org images
orgImagesUtils.create = async (data) => {
    try {
        const result = await orgImages.bulkCreate(data);
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = orgImagesUtils;