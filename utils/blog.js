const { blog } = require("../models");

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
    const result = await blog.findByPk(blogId);
    return result;
  } catch (err) {
    throw err;
  }
};

// read all
blogUtil.read = async () => {
  try {
    const result = await blog.findAll({
      order: [["id", "DESC"]],
    });
    return result;
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
