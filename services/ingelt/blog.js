const express = require("express");
const blogUtil = require("../../utils/blog");
const blogService = express.Router();

// create new blog
blogService.post("/", async (req, res) => {
  try {
    const result = await blogUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});
// read all categories
blogService.get("/categories", async (req, res) => {
  console.log("inside categories");
  try {
    const result = await blogUtil.readCategories();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// delete blog
blogService.delete("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const result = await blogUtil.delete(blogId);
    const message = `Blog with id${blogId} deleted successfully`;
    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json(err);
  }
});

// update
blogService.put("/:blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const updateData = req.body;
  try {
    const result = await blogUtil.update(blogId, updateData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});
// read by id
blogService.get("/:blogId", async (req, res) => {
  try {
    const result = await blogUtil.readById(req.params.blogId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});
// read all blogs
blogService.get("/", async (req, res) => {
  console.log("inside blog");
  try {
    const result = await blogUtil.read();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// read blogs by category
blogService.get("/category/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const result = await blogUtil.readByCategory(category);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = blogService;
