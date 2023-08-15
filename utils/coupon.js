const { coupon } = require("../models");

const couponUtil = {};

// create
couponUtil.create = async (data) => {
    try {
        if (data.couponCode) {
            data.couponCode = data.couponCode.toUpperCase();
        }
        const result = await coupon.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get all
couponUtil.getAll = async (couponFor = null) => {
    try {

        let searchQuery = {};

        if (couponFor) {
            searchQuery = {
                where: {
                    couponFor: couponFor,
                }
            };
        }

        const result = await coupon.findAll({
            ...searchQuery,
            order: [['createdAt', 'DESC']],
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// coupon validation
couponUtil.couponValidation = async (couponCode, couponFor) => {
    try {

        const getCoupon = await coupon.findOne({
            where: {
                couponCode: couponCode,
                couponFor: couponFor,
            },
            plain: true,
        });

        if (!getCoupon) {
            return {
                validation: false,
                message: 'Invalid coupon code',
            };
        }

        if (getCoupon.startDate && getCoupon.endDate) {

            let startDate = getCoupon.startDate;
            let endDate = getCoupon.endDate;
            let currentDate = new Date();
            startDate = new Date(startDate);
            endDate = new Date(endDate);

            const removeTimeFromDate = (date) => {
                return new Date(date.getFullYear(), date.getMonth(), date.getDate());
            }

            if (currentDate < removeTimeFromDate(startDate)) {

                return {
                    validation: false,
                    message: 'This coupon code is valid from',
                    date: getCoupon.startDate,
                }
            }

            if (removeTimeFromDate(endDate) < currentDate) {
                return {
                    validation: false,
                    message: 'This coupon code is expired',
                }
            }
        }

        return {
            validation: true,
            message: 'Coupon applied successfully',
            coupon: getCoupon,
        };

    } catch (err) {
        throw err;
    }
}

// update
couponUtil.update = async (couponId, data) => {
    try {
        const result = await coupon.update(data, {
            where: {
                id: couponId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// delete
couponUtil.delete = async (couponId) => {
    try {
        const result = await coupon.destroy({
            where: {
                id: couponId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = couponUtil;