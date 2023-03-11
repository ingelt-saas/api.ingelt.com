const mockTestModel = (sequelize, DataTypes) => {
  return sequelize.define("mockTest", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    batchId: {
      type: DataTypes.UUID,
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

module.exports = mockTestModel;
