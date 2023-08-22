module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studentActivity', {
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });
}