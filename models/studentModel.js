const studentModel = (sequelize, DataTypes) => {
  return sequelize.define("student", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    batch_id: {
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

    phone_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "phone number is required" },
      },
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
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

    pin_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "pincode number is required" },
      },
    },

    dob: DataTypes.DATE,

    reg_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "registration date is required" },
      },
    },

    active: DataTypes.BOOLEAN,

    target_score: DataTypes.FLOAT,

    previous_score: DataTypes.FLOAT,

    average_band: DataTypes.INTEGER,

    total_average_band: DataTypes.INTEGER,
  });
};

module.exports = studentModel;
