const libraryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "library",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

      fileSize: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = libraryModel;
