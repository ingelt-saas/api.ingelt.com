const { discussionReport } = require("../models");

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

module.exports = discussionReportUtil;