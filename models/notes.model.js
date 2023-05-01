const notesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "notes",
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

      uploaderName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "uploader name is required" },
        },
      },

      uploaderId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "uploader id is required" },
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

module.exports = notesModel;
