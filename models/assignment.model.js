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

    uploadedDate: {
      type: DataTypes.DATE,
      defaultValue: Date.now,
    },

    endDate: DataTypes.DATE,

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
  });
};
