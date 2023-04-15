const express = require("express");
const subscriberUtil = require("../../utils/subscriber");
const subscriberService = express.Router();

subscriberService.post("/", async (req, res) => {
  try {
    const result = await subscriberUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = subscriberService;
