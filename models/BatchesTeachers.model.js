module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "BatchesTeachers",
    {
      subject: {
        type: DataTypes.ENUM,
        values: ['reading', 'writing', 'speaking', 'listening']
      },
    },
    { timestamps: true }
  );
};
