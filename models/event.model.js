module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
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
            type: DataTypes.STRING,
            allowNull: false,
            notNull: { msg: 'event duration is required' }
        },
        joinUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
        eventDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    });
}