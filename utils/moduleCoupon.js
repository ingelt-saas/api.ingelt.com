const { moduleCoupon } = require("../models");

const moduleCouponUtil = {};

// create
moduleCouponUtil.create = async (data) => {
    try {
        if (data.couponCode) {
            data.couponCode = data.couponCode.toUpperCase();
        }
        const result = await moduleCoupon.create(data);
        return result;
    } catch (err) {
        throw err;
    }
}

// get all
moduleCouponUtil.getAll = async () => {
    try {
        const result = await moduleCoupon.findAll({
            order: [['createdAt', 'DESC']],
        });
        return result;
    } catch (err) {
        throw err;
    }
}

// coupon validation
moduleCouponUtil.couponValidation = async (couponCode) => {
    try {

        const coupon = await moduleCoupon.findOne({
            where: {
                couponCode: couponCode,
            },
            plain: true,
        });

        if (!coupon) {
            return {
                validation: false,
                message: 'Invalid coupon code',
            };
        }

        if (coupon.startDate && coupon.endDate) {

            let startDate = coupon.startDate;
            let endDate = coupon.endDate;
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
                    date: coupon.startDate,
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
            coupon: coupon,
        };

    } catch (err) {
        throw err;
    }
}

// update
moduleCouponUtil.update = async (couponId, data) => {
    try {
        const result = await moduleCoupon.update(data, {
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
moduleCouponUtil.delete = async (couponId) => {
    try {
        const result = await moduleCoupon.destroy({
            where: {
                id: couponId,
            }
        });
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = moduleCouponUtil;