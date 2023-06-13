const express = require("express");
const ieltsPrepUtil = require("../../utils/ieltsPrep");
const ieltsPrepService = express.Router();

// create new ieltsPrep
ieltsPrepService.post("/", async (req, res) => {
    try {
        const result = await ieltsPrepUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get all ieltsPrep
ieltsPrepService.get("/", async (req, res) => {
    try {
        const result = await ieltsPrepUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get a ieltsPrep by ieltsPrep id
ieltsPrepService.get("/:studentId", async (req, res) => {
    try {
        const result = await ieltsPrepUtil.readById(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// update ieltsPrep
ieltsPrepService.put("/:studentId", async (req, res) => {
    try {
        const result = await ieltsPrepUtil.update(req.params.studentId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// delete ieltsPrep
ieltsPrepService.delete("/:studentId", async (req, res) => {
    try {
        const result = await ieltsPrepUtil.delete(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

module.exports = ieltsPrepService;