const mockTestMarksModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "mockTestMarks",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      listeningBands: {
        type: DataTypes.FLOAT,
      },

      readingBands: {
        type: DataTypes.FLOAT,
      },

      writingBands: {
        type: DataTypes.FLOAT,
      },

      speakingBands: {
        type: DataTypes.FLOAT,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = mockTestMarksModel;
