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

      subject: DataTypes.STRING,

      uploadedBy: {
        type: DataTypes.STRING,
        // allowNull: false,
        // validate: {
        //   notNull: { msg: "uploaded-by is required" },
        // },
      },

      fileSize: DataTypes.STRING,
    },
    {
      timestamps: true,
    }
  );
};

module.exports = notesModel;
