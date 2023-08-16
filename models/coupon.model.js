const coupon = (sequelize, DataTypes) => {
    return sequelize.define('coupon', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        couponFor: {
            type: DataTypes.ENUM,
            values: ['module', 'class', 'session'],
            allowNull: false,
            validate: {
                notNull: { msg: 'please provide couponFor ex: module, class, session' }
            }
        },
        couponCode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'coupon code is required' }
            },
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: { msg: 'coupon amount is required' }
            },
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    });
};

module.exports = coupon