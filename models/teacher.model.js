const teacherModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "teacher",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        },
      },

      gender: {
        type: DataTypes.STRING,
        values: ['Male', 'Female', 'Other'],
        defaultValue: null,
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

      image: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      expertise: DataTypes.STRING,

      dob: DataTypes.DATE,

      phoneNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "phone number is required" },
        },
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

      workExp: DataTypes.FLOAT,

      active: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = teacherModel;
