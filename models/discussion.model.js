const discussionModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "discussion",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      batchId: {
        type: DataTypes.UUID,
        unique: false,
        allowNull: false,
        validate: {
          notNull: { msg: "batch id is required" },
        },
      },

      senderId: {
        type: DataTypes.UUID,
      },

      senderName: DataTypes.STRING,

      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "message is required" },
        },
      },

      designation: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = discussionModel;
