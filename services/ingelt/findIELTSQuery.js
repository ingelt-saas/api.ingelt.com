const express = require ("express");
const findIELTSQueryUtil = require("../../utils/findIELTSQuery");
const findIELTSQueryService = express.Router();

// create new findIELTSQuery
findIELTSQueryService.post("/", async (req, res) => {
    try {
        const result = await findIELTSQueryUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get all findIELTSQuery
findIELTSQueryService.get("/", async (req, res) => {
    try {
        const result = await findIELTSQueryUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get a findIELTSQuery by findIELTSQuery id
findIELTSQueryService.get("/:studentId", async (req, res) => {
    try {
        const result = await findIELTSQueryUtil.readById(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);
// update a findIELTSQuery by findIELTSQuery id
findIELTSQueryService.put("/:studentId", async (req, res) => {
    try {
        const result = await findIELTSQueryUtil.update(req.params.studentId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);
// delete a findIELTSQuery by findIELTSQuery id
findIELTSQueryService.delete("/:studentId", async (req, res) => {
    try {
        const result = await findIELTSQueryUtil.delete(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

module.exports = findIELTSQueryService;