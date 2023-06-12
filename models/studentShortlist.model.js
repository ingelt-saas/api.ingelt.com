const studentShortlist = (sequelize, DataTypes) => {
    return sequelize.define('studentShortlist', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        universityId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    });
}

module.exports = studentShortlist;