module.exports = (sequelize, DataTypes) => {
  const VisaQuery = sequelize.define(
    "visaQuery",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        // allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notNull: { msg: "name is required" },
        // },
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notNull: { msg: "Phone Number is required" },
        // },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      visaType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      interestedCountry: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      previousRefusal: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return VisaQuery;
};
