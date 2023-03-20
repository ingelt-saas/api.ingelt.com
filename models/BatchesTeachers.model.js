module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "BatchesTeachers",
    {
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
