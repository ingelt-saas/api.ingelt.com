const notesModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "notes",
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
      uploaderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      uploaderType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subject: {
        type: DataTypes.ENUM,
        values: ['Reading', 'Writing', 'Speaking', 'Listening', 'All']
      },
      fileSize: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = notesModel;
