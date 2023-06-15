const express = require("express");
const visaQueryUtil = require("../../utils/visaQuery");
const { col } = require("sequelize");
const visaQueryService = express.Router();

// create new visaQuery
visaQueryService.post("/", async (req, res) => {
  try {
    const result = await visaQueryUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
    console.log("this is error");
    console.log(err);
  }
});
// get all visaQueries
visaQueryService.get("/", async (req, res) => {
  try {
    const result = await visaQueryUtil.read();
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});
// get a visaQuery by visaQuery id
visaQueryService.get("/:studentId", async (req, res) => {
  try {
    const result = await visaQueryUtil.readById(req.params.studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});
// update visaQuery
visaQueryService.put("/:studentId", async (req, res) => {
  try {
    const result = await visaQueryUtil.update(req.params.studentId, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});
// delete visaQuery
visaQueryService.delete("/:studentId", async (req, res) => {
  try {
    const result = await visaQueryUtil.delete(req.params.studentId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = visaQueryService;
