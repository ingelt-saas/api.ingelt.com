const {findIELTSQuery} = require("../models");
const studentUtil = require("./student");

const findIELTSQueryUtil = {};

// POST
findIELTSQueryUtil.create = async (newFindIELTSQuery) => {
    try {
        let name = newFindIELTSQuery.name;
        name = studentUtil.capitalizeAllWords(name);
        newFindIELTSQuery.name = name;
        const result = await findIELTSQuery.create(newFindIELTSQuery);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
    }
    // GET
findIELTSQueryUtil.read = async () => {
    try {
        const result = await findIELTSQuery.findAll({
            order: [["id", "DESC"]],
        });
        return result;
    } catch (err) {
        throw err;
    }
}
// GET by id
findIELTSQueryUtil.readById = async (studentId) => {
    try {
        let result = await findIELTSQuery.findOne({
            where: {
                studentId: studentId,
            },
        });
        if (result) {
            result = result.get({ plain: true });
        }
        return result;
    } catch (err) {
        throw err;
    }
}
// PUT
findIELTSQueryUtil.update = async (studentId, updateData) => {
    try {
        if (updateData.name) {
            let name = updateData.name;
            name = studentUtil.capitalizeAllWords(name);
            updateData.name = name;
        }
        console.log(updateData);
        const result = await findIELTSQuery.update(updateData, {
            where: {
                studentId: studentId,
            },
        });
        return result;
    } catch (err) {
        throw err;
    }
}
// DELETE
findIELTSQueryUtil.delete = async (studentId) => {
    try {
        const result = await findIELTSQuery.destroy({
            where: {
                studentId: studentId,
            },
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = findIELTSQueryUtil;