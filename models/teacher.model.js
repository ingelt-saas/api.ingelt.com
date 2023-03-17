const teacherModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "teacher",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      batchId: {
        type: DataTypes.UUID
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name is required" },
        },
      },

      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
        validate: {
          notNull: { msg: "gender is required" },
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
        allowNull: false,
        validate: {
          notNull: { msg: "city number is required" },
        },
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "state number is required" },
        },
      },

      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "country number is required" },
        },
      },

      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "pincode number is required" },
        },
      },

      workExp: DataTypes.FLOAT,

      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },

      syllabus: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
};

module.exports = teacherModel;
