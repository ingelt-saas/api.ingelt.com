const notesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "notes",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      uploadedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: "uploadedBy is required" },
        },
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

module.exports = notesModel;
