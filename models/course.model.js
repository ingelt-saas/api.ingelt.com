module.exports = (sequelize, DataTypes) => {
    return sequelize.define('course', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: 'course name is required' }
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
            notNull: { msg: 'course duration is required' }
        },
        fee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            notNull: { msg: 'course fee is required' }
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: 'course level is required' }
        },
    });
}