module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "blog",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Title is required" },
        },
      },
      picture: {
        type: DataTypes.STRING,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Text is required" },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Category is required" },
        },
      },
    },
    {
      timestamps: true,
    }
  );
  return Blog;
};
