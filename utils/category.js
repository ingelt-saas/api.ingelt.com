const { category } = require("../models");

const categoryUtil = {};

categoryUtil.capitalizeAllWords = (str) => {
    return str.replace(/\b\w/g, (match) => {
        return match.toUpperCase();
    });
}

// post 
categoryUtil.create = async (data) => {
    try {
        if (data.name) {
            data.name = categoryUtil.capitalizeAllWords(data.name);
        }
        const result = await category.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// check name exists
categoryUtil.checkByName = async (categoryName) => {
    try {
        const result = await category.findOne({
            where: {
                name: categoryName,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// read all
categoryUtil.read = async () => {
    try {
        const result = await category.findAll({
            order: [['createdAt', 'DESC']]
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// update category
categoryUtil.update = async (categoryId, updatedData) => {
    try {
        const result = await category.update(updatedData, {
            where: {
                id: categoryId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// delete category
categoryUtil.delete = async (categoryId) => {
    try {
        const result = await category.destroy({
            where: {
                id: categoryId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = categoryUtil;