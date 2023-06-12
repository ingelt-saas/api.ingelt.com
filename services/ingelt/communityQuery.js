const express = require("express"); 
const communityQueryUtil = require("../../utils/communityQuery");
const communityQueryService = express.Router();

// create new communityQuery
communityQueryService.post("/", async (req, res) => {
    try {
        const result = await communityQueryUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    }
);

// get all communityQuery   
communityQueryService.get("/", async (req, res) => {
    try {
        const result = await communityQueryUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// get a communityQuery by communityQuery id
communityQueryService.get("/:studentId", async (req, res) => {
    try {
        const result = await communityQueryUtil.readById(req.params.studentId);
        console.log(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

// update communityQuery
communityQueryService.put("/:studentId", async (req, res) => {
    try {
        const result = await communityQueryUtil.update(req.params.studentId, req.body);
        // console.log(req.params.studentId);
        // console.log(req.body);
        res.status(201).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
    }
);

// delete communityQuery
communityQueryService.delete("/:studentId", async (req, res) => {
    try {
        const result = await communityQueryUtil.delete(req.params.studentId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
    }
);

module.exports = communityQueryService;