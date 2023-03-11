const orgImagesModel = (sequelize, DataTypes) => {
  return sequelize.define("orgImages", {
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
  });
};

module.exports = orgImagesModel;
