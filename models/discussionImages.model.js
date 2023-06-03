const discussionModel = (sequelize, DataTypes) => {
    return sequelize.define(
        "discussionImages",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            }
        },
        {
            timestamps: true,
        }
    );
};

module.exports = discussionModel;
