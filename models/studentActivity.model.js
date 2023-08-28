module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studentActivity', {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        endDate: {
            type: DataTypes.DATE,
            defaultValue: null,
        }
    });
}