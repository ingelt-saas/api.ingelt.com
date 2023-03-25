module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "admin",
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

      organizationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      picture: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
