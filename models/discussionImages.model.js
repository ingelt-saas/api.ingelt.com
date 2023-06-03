const discussionModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "discussionImages",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'image is required' }
                }
            }
        },
        {
            timestamps: true,
        }
    );
};

module.exports = discussionModel;
