const { payment, student } = require("../models");
const organizationUtil = require("./organization");

const paymentUtil = {};

// create
paymentUtil.create = async (data) => {
    try {
        const result = await payment.create(data);
        const getInGelt = await organizationUtil.getInGelt();
        await student.update({ payment: true, organizationId: getInGelt.id }, {
            where: {
                id: data.studentId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = paymentUtil;