const { blog } = require("../models");
const sequelize = require("sequelize");

const blogUtil = {};

// create new blog
blogUtil.create = async (newBlog) => {
  try {
    const result = await blog.create(newBlog);
    return result;
  } catch (err) {
    throw err;
  }
};
// delete blog
blogUtil.delete = async (blogId) => {
  try {
    const result = await blog.destroy({
      where: {
        id: blogId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
// update
blogUtil.update = async (blogId, updateData) => {
  try {
    const result = await blog.update(updateData, {
      where: {
        id: blogId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// read by id
blogUtil.readById = async (blogId) => {
  try {
    let result = await blog.findByPk(blogId);
    if (result) {
      result = result.get({ plain: true });
    }
    return result;
  } catch (err) {
    throw err;
  }
};

// read all blogs
blogUtil.read = async (pageNo, limit, searchQuery) => {
  try {
    let findQuery = {};
    if (searchQuery) {
      findQuery = {
        where: {
          [sequelize.Op.or]: [
            { title: { [sequelize.Op.like]: `%${searchQuery}%` } },
            { text: { [sequelize.Op.like]: `%${searchQuery}%` } },
            { category: { [sequelize.Op.like]: `%${searchQuery}%` } },
          ]
        }
      }
    }

    const result = await blog.findAndCountAll({
      ...findQuery,
      order: [["createdAt", "DESC"]],
      offset: (pageNo - 1) * limit,
      limit: limit,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

// read blogs for student
blogUtil.readForStudent = async () => {
  try {
    const result = await blog.findAll({
      where: {
        forStudent: true,
      }
    });
    return result;
  } catch (err) {
    throw err;
  }
}

// read all categories
blogUtil.readCategories = async () => {
  console.log("Hello");
  try {
    const distinctCategories = await blog.findAll({
      attributes: [
        [sequelize.fn("DISTINCT", sequelize.col("category")), "category"],
      ],
    });
    return distinctCategories;
  } catch (err) {
    throw err;
  }
};

// read blogs by category
blogUtil.readByCategory = async (category) => {
  try {
    const result = await blog.findAll({
      where: { category: category },
      order: [["id", "DESC"]],
    });
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = blogUtil;
