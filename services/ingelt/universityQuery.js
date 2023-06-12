const express = require("express");
const universityQueryUtil = require("../../utils/universityQuery");
const universityQueryService = express.Router();

// create new universityQuery
universityQueryService.post("/", async (req, res) => {
    try {
        const result = await universityQueryUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get all universityQuery
universityQueryService.get("/", async (req, res) => {
    try {
        const result = await universityQueryUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get a universityQuery by universityQuery id
universityQueryService.get("/:studentId", async (req, res) => {
    try {
        const result = await universityQueryUtil.readById(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// update universityQuery
universityQueryService.put("/:studentId", async (req, res) => {
    try {
        const result = await universityQueryUtil.update(req.params.studentId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// delete universityQuery
universityQueryService.delete("/:studentId", async (req, res) => {
    try {
        const result = await universityQueryUtil.delete(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

module.exports = universityQueryService;