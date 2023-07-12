module.exports = (sequelize, DataTypes) => {
    return sequelize.define('eventBooking', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        }
    });
}