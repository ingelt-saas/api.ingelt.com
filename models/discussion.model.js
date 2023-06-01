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
      image: {
        type: DataTypes.STRING,
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
