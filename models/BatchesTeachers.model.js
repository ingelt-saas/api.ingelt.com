module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "BatchesTeachers",
    {
      subject: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: true }
  );
};
