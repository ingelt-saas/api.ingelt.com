const { course } = require("../models");

const courseUtil = {};

courseUtil.capitalizeAllWords = (str) => {
    return str.replace(/\b\w/g, (match) => {
        return match.toUpperCase();
    });
}

// insert course
courseUtil.create = async (data) => {
    try {
        if (data.name) {
            data.name = courseUtil.capitalizeAllWords(data.name);
        }
        const result = await course.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// check by name
courseUtil.getByName = async (name) => {
    try {
        const result = await course.findOne({ where: { name: name } });
        return result;
    } catch (err) {
        throw err;
    }
}

// read courses
courseUtil.getCoursesByUniversity = async (universityId) => {
    try {
        const result = await course.findAll({
            where: {
                universityId: universityId,
            },
            order: [['name', 'ASC']],
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// update course
courseUtil.update = async (courseId, updateData) => {
    try {
        if (updateData.name) {
            updateData.name = courseUtil.capitalizeAllWords(updateData.name);
        }
        const result = await course.update(courseId, updateData);
        return result;
    } catch (err) {
        throw err;
    }
}

// delete course
courseUtil.delete = async (courseId) => {
    try {
        const result = await course.destroy({
            where: {
                id: courseId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = courseUtil;