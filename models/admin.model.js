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
        allowNull: false,
        unique: 'true',
        validate: {
          notNull: { msg: "email is required" },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: true,
        // validate: {
        //   notNull: { msg: "password is required" },
        // },
      },

      picture: {
        type: DataTypes.STRING,
        allowNull: true,
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
        const nextID = `IGO${nextNumericPart.toString(16).toUpperCase()}`;
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