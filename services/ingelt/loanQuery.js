const express = require("express");
const loanQueryUtil = require("../../utils/loanQuery");
const loanQueryService = express.Router();

// create new loanQuery 
loanQueryService.post("/", async (req, res) => {
    try {
        const result = await loanQueryUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    }
);

// get all loanQuery
loanQueryService.get("/", async (req, res) => {
    try {
        const result = await loanQueryUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get a loanQuery by loanQuery id
loanQueryService.get("/:studentId", async (req, res) => {
    try {
        const result = await loanQueryUtil.readById(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// update loanQuery
loanQueryService.put("/:studentId", async (req, res) => {
    try {
        const result = await loanQueryUtil.update(req.params.studentId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);
// delete loanQuery
loanQueryService.delete("/:studentId", async (req, res) => {
    try {
        const result = await loanQueryUtil.delete(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

module.exports = loanQueryService;
