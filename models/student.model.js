const studentModel = (sequelize, DataTypes) => {
  return sequelize.define("student", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    batchId: {
      type: DataTypes.UUID,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "name is required" },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "email is required" },
      },
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
      allowNull: false,
      validate: {
        notNull: { msg: "gender is required" },
      },
    },

    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "city is required" },
      },
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "state is required" },
      },
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "country is required" },
      },
    },

    pinCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "pincode number is required" },
      },
    },

    dob: DataTypes.DATE,

    active: DataTypes.BOOLEAN,

    targetScore: DataTypes.FLOAT,

    previousScore: DataTypes.FLOAT,

    averageBand: DataTypes.INTEGER,

    totalAverageBand: DataTypes.INTEGER,
  });
};

module.exports = studentModel;
