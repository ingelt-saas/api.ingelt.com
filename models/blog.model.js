module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "blog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "HTML content is required" },
        },
      },
      textContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: "Text content is required" },
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
