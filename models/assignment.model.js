module.exports = (sequelize, DataTypes) => {
  return sequelize.define("assignment", {
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

    assignedDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "assigned date is required" },
      },
    },

    endDate: DataTypes.DATE,

    file: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "file is required" },
      },
    },
  });
};
