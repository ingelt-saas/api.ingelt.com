const express = require("express");
const mockTestUtil = require("../../utils/mockTest");
const mockTestService = express.Router();

// get all mock test and avg band by batch id
mockTestService.get("/batch/:batchId", async (req, res) => {
  try {
    const result = await mockTestUtil.mockTestAvgBand(req.params.batchId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = mockTestService;
