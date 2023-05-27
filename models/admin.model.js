module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "admin",
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

      picture: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  Admin.beforeCreate(async (teacher, options) => {
    try {
      const lastTeacher = await Admin.findOne({
        order: [["createdAt", "DESC"]],
      });

      if (lastTeacher) {
        const numericPart = parseInt(lastTeacher.id.slice(3), 16); // Extract the numeric part from the last teacher's ID
        const nextNumericPart = numericPart + 1;
        const nextID = `IGS${nextNumericPart.toString(16).toUpperCase()}`;
        teacher.id = nextID;
      } else {
        teacher.id = "IGO3E7"; // If there are no previous teachers, set the initial ID
      }
    } catch (err) {
      throw err;
    }
  });

  return Admin;
};
