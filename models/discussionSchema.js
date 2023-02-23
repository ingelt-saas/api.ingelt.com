
const discussionModel = (sequelize, DataTypes) => {
    return sequelize.define("discussion", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        batch_id: {
            type: DataTypes.UUID
        },
        sender_id: {
            type: DataTypes.UUID,
        },
        sender_name: DataTypes.STRING,
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: 'message is required' }
            }
        },
        datetime: DataTypes.DATE,
    });
}

module.exports = discussionModel;