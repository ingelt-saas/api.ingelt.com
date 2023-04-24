module.exports = (sequelize, DataTypes) => {
  return sequelize.define("submission", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    file: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "file is required" },
      },
    },

    submissionDate: DataTypes.DATE,

    status: {
      type: DataTypes.ENUM,
      values: ['uploaded', 'submitted'],
      defaultValue: 'uploaded' // uploaded and submitted
    },

    evaluated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    scores: DataTypes.STRING,

    remarks: DataTypes.STRING,
  });
};
