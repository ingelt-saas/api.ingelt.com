const express = require("express");
const blogUtil = require("../../utils/blog");
const { memoryStorage } = require("multer");
const multer = require("multer");
const blogService = express.Router();
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require('../../aws/upload');
const deleteFile = require('../../aws/delete');

// create new blog
blogService.post("/", upload.single('thumbnail'), async (req, res) => {
  try {
    const file = req.file;

    awsUpload(file, 'ingelt/blogs', async (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const newBlog = req.body;
        newBlog.picture = data.Key;
        const result = await blogUtil.create(newBlog);
        res.status(201).json(result);
      }
    });
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
    const getBlog = await blogUtil.readById(blogId);
    getBlog.picture && await deleteFile(getBlog.picture);

    const result = await blogUtil.delete(blogId);
    const message = `Blog with id${blogId} deleted successfully`;
    res.status(208).json({ message });
  } catch (err) {
    res.status(400).json(err);
  }
});

// update blog
blogService.put("/:blogId", upload.single('thumbnail'), async (req, res) => {
  try {

    const updateData = req.body;
    const file = req.file;
    const getBlog = await blogUtil.readById(req.params.blogId);

    const __thumbnailUpload = (file) => new Promise((resolve, reject) => {
      awsUpload(file, 'ingelt/blogs', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (file) {
      const updatedThumbnail = await __thumbnailUpload(file);
      updateData.picture = updatedThumbnail.Key;
      getBlog.picture && await deleteFile(getBlog.picture);
    }

    const result = await blogUtil.update(req.params.blogId, updateData);
    res.json(result);

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

// read all blogs
blogService.get("/getall", async (req, res) => {
  try {
    const { s, pageNo, limit } = req.query;
    const result = await blogUtil.read(parseInt(pageNo), parseInt(limit), s);
    res.status(200).json(result);
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
