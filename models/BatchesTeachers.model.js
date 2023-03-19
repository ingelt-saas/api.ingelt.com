module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "BatchesTeachers",
    {
      batchId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },

      teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },

      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
};
