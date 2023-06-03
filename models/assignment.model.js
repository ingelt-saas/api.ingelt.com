module.exports = (sequelize, DataTypes) => {
  return sequelize.define("assignment", {
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
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: "file size is required" },
      },
    },
    subject: {
      type: DataTypes.ENUM,
      values: ['Reading', 'Writing', 'Speaking', 'Listening', 'All']
    },
    uploaderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploaderType: {
      type: DataTypes.STRING,
      allowNull: false,
    }

  });
};
