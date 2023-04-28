const studentModel = (sequelize, DataTypes) => {
  return sequelize.define("student", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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

    pinCode: {
      type: DataTypes.STRING,
    },

    dob: DataTypes.DATE,

    active: DataTypes.BOOLEAN,

    status: {
      type: DataTypes.ENUM,
      values: ['PRE', 'APPL', 'FEE', 'ADM', 'COM'],
      defaultValue: "PRE", // PRE - before applied | APPL - Applied | FEE - Fee Paid | ADM - Admitted | COM - Completed
    },

    targetScore: DataTypes.FLOAT,

    previousScore: DataTypes.FLOAT,

    averageBands: DataTypes.FLOAT,
  });
};

module.exports = studentModel;
