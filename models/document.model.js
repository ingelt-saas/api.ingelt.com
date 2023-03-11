const documentModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "document",
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

      fileSize: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = documentModel;
