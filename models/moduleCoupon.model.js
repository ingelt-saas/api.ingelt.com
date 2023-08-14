const moduleCoupon = (sequelize, DataTypes) => {
    return sequelize.define('moduleCoupon', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
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

module.exports = moduleCoupon