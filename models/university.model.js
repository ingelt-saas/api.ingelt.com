const universityModel = (sequelize, DataTypes) => {
  return sequelize.define("university", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "university name is required" },
      },
    },
    // logo: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //         notNull: { msg: 'university logo is required' }
    //     }
    // },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "university location is required" },
      },
    },
    ranking: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    yearlyFee: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "yearly fee is required" },
      },
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "course name is required" },
      },
    },
    courseDuration: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "course duration is required" },
      },
    },
    areaOfInterest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseLevel: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

module.exports = universityModel;
