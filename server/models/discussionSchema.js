
const discussionModel = (sequelize, DataTypes) => {
    return sequelize.define('discussion', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        batch_id: {
            type: DataTypes.UUID,
            references: {
                model: 'batch',
                key: 'id',
            }
        },
        sender_id: {
            type: DataTypes.UUID,
            references: {
                model: 'student',
                key: 'id',
            }
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