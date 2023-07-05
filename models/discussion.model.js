const discussionModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "discussion",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      senderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
      },
      parentDiscussionId: {
        type: DataTypes.UUID,
        allowNull: true
      },
      designation: {
        type: DataTypes.ENUM,
        values: ['student', 'teacher', 'admin']
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = discussionModel;
