const teacherModel = (sequelize, DataTypes) => {
  const Teacher = sequelize.define(
    "teacher",
    {
      id: {
        type: DataTypes.STRING,
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
        defaultValue: true,
      },
    },
    {
      timestamps: true,
    }
  );
  Teacher.beforeCreate(async (teacher, options) => {
    try {
      const lastTeacher = await Teacher.findOne({ order: [["createdAt", "DESC"]] });

      if (lastTeacher) {
        const numericPart = parseInt(lastTeacher.id.slice(3), 16); // Extract the numeric part from the last teacher's ID
        const nextNumericPart = numericPart + 1;
        const nextID = `IGT${nextNumericPart.toString(16).toUpperCase()}`;
        teacher.id = nextID;
      } else {
        teacher.id = "IGT3E7"; // If there are no previous teachers, set the initial ID
      }
    } catch (err) {
      throw err;
    }
  });

  return Teacher;
};

module.exports = teacherModel;
