const { payment, student } = require("../models");

const paymentUtil = {};

// create
paymentUtil.create = async (data) => {
    try {
        const result = await payment.create(data);
        await student.update({ payment: true }, {
            where: {
                id: data.studentId
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = paymentUtil;