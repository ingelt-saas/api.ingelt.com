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

      subject: {
        type: DataTypes.ENUM,
        values: ['reading', 'writing', 'speaking', 'listening']
      },
      fileSize: DataTypes.STRING,
      uploadedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          msg: 'uploader name is required.',
        }
      }
    },
    {
      timestamps: true,
    }
  );
};

module.exports = notesModel;
