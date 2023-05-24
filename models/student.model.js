const studentModel = (sequelize, DataTypes) => {
  return sequelize.define("student", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roll: {
      type: DataTypes.UUID,
      // unique: true,
    },

    batchId: {
      type: DataTypes.UUID,
      allowNull: true,
      default: null,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
      },
    },

    fathersName: DataTypes.STRING,

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "email is required" },
      },
    },

    image: {
      type: DataTypes.STRING,
      default: null,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "password is required" },
      },
    },

    phoneNo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "phone number is required" },
      },
    },

    gender: {
      type: DataTypes.STRING,
    },

    city: {
      type: DataTypes.STRING,
    },

    state: {
      type: DataTypes.STRING,
    },

    country: {
      type: DataTypes.STRING,
    },
    interestedCountry: {
      type: DataTypes.STRING,
    },

    pinCode: {
      type: DataTypes.STRING,
    },

    dob: DataTypes.DATE,

    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    status: {
      type: DataTypes.ENUM,
      values: ['PRE', 'APPL', 'FEE', 'ADM', 'COM'],
      defaultValue: "PRE", // PRE - before applied | APPL - Applied | FEE - Fee Paid | ADM - Admitted | COM - Completed
    },
    type: {
      type: DataTypes.ENUM,
      values: ['ingelt', 'walk-in'],
      defaultValue: 'ingelt',
    },

    targetScore: DataTypes.FLOAT,

    previousScore: DataTypes.FLOAT,

    averageBands: DataTypes.FLOAT,
  });
};

module.exports = studentModel;
