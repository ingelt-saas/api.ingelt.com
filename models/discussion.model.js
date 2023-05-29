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
        allowNull: false,
        validate: {
          notNull: { msg: "message is required" },
        },
      },
      designation: {
        type: DataTypes.ENUM,
        values: ['student', 'teacher', 'admin']
      }
    },
    {
      timestamps: true,
    }
  );
};

module.exports = discussionModel;
