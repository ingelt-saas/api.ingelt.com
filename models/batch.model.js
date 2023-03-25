module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "batch",
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

      regDate: DataTypes.DATE,

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "required" },
        },
      },

      endDate: DataTypes.DATE,

      classroomLink: DataTypes.STRING,

      averageBand: DataTypes.INTEGER,

      totalAverageBand: DataTypes.INTEGER,
    },
    {
      timestamps: true,
    }
  );
};
