module.exports = (sequelize, DataTypes) => {
    return sequelize.define('discussionReport', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        reporterId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reporterDesignation: {
            type: DataTypes.ENUM,
            values: ['student', 'teacher', 'admin']
        }
    });
}