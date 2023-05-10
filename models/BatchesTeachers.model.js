module.exports = (sequelize, DataTypes) => {
  return sequelize.define("BatchesTeachers", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  }
  );
};
