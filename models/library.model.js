const libraryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "library",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        },
      },
      file: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "file is required" },
        },
      },
      subject: {
        type: DataTypes.ENUM,
        values: ['reading', 'writing', 'speaking', 'listening']
      },

      fileSize: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = libraryModel;
