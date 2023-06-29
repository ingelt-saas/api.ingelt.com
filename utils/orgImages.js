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

// get images by org
orgImagesUtils.getImagesByOrg = async (orgId) => {
    try {
        const result = await orgImages.findAll({
            where: {
                organizationId: orgId,
            },
            raw: true,
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// delete image by image id
orgImagesUtils.delete = async (imageId) => {
    try {
        const result = await orgImages.destroy({ where: { id: imageId } });
        return result;
    } catch (err) {
        throw err;
    }
}

// delete org images
orgImagesUtils.deleteByOrg = async (orgId) => {
    try {
        const result = await orgImages.destroy({
            where: {
                organizationId: orgId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = orgImagesUtils;