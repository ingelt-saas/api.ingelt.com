const express = require("express");
const visaQueryUtil = require("../../utils/visaQuery");
const visaQueryService = express.Router();

// create new visaQuery
visaQueryService.post("/", async (req, res) => {
    try {
        const result = await visaQueryUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all visaQueries
visaQueryService.get("/getall", async (req, res) => {
    try {
        const { s, pageNo, limit } = req.query;
        const result = await visaQueryUtil.read(parseInt(pageNo), parseInt(limit), s);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a visaQuery by student id
visaQueryService.get("/:studentId", async (req, res) => {
    try {
        const result = await visaQueryUtil.readById(req.params.studentId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update visaQuery
visaQueryService.put("/:studentId", async (req, res) => {
    try {
        const result = await visaQueryUtil.update(req.params.studentId, req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete visaQuery
visaQueryService.delete("/:visaQueryId", async (req, res) => {
    try {
        const result = await visaQueryUtil.delete(req.params.visaQueryId);
        res.status(208).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = visaQueryService;