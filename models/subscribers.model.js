module.exports = (sequelize, DataTypes) => {
  return sequelize.define("subscriber", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
