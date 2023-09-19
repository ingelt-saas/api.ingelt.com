module.exports = (sequelize, DataTypes) => {
    return sequelize.define('studentFeedback', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        studentName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { message: 'student name is required' } }
        },
        visaType: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { message: 'visa type is required' } }
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { message: 'country is required' } }
        },
        video: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { message: 'video is required' } }
        },
        content: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    });
}