module.exports = (sequelize, DataTypes) => {
  const LoanQuery = sequelize.define(
    "loanQuery",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "name is required" },
        // },
      },
      phoneNo: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "Phone Number is required" },
        // },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      annualIncome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      preferredIntake: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['open', 'rejected', 'docCollection', 'filePreparation', 'appliedForLoan', 'loanDisbursed'],
        defaultValue: 'open'
      }
    },
    {
      timestamps: true,
    }
  );
  return LoanQuery;
};
