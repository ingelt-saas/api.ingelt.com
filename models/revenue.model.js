module.exports = (sequelize, DataTypes) => {
    return sequelize.define('revenue', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        orgFee: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: { msg: 'organization fee is required' }
            }
        },
        inGeltCommission: {
            type: DataTypes.FLOAT,
            defaultValue: null,
        },
        studentType: {
            type: DataTypes.ENUM,
            values: ['walk-in', 'ingelt'],
            allowNull: false,
            validate: {
                notNull: { msg: 'student type is required' }
            }
        },
    });
}