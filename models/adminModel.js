module.exports = (sequelize, DataTypes) => {
  return sequelize.define("admin", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    org_id: {
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

    picture: {
      type: DataTypes.STRING,
    },
  });
};
