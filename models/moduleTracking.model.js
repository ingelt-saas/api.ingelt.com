module.exports = (sequelize, DataTypes) => {
    return sequelize.define('moduleTracking', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        startDuration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        endDuration: {
            type: DataTypes.FLOAT,
            allowNull: true,
            defaultValue: null,
        }
    });
}