const express = require("express");
const organizationUtil = require("../../utils/organization");
const organizationService = express.Router();

// create new organization 
organizationService.post("/", async (req, res) => {
    try {
        const result = await organizationUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all organization 
organizationService.get("/", async (req, res) => {
    try {
        const result = await organizationUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a organization by organization id  
organizationService.get("/:orgId", async (req, res) => {
    try {
        const result = await organizationUtil.readById(req.params.orgId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update organization
organizationService.put("/:orgId", async (req, res) => {
    try {
        const result = await organizationUtil.update(req.params.orgId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete organization
organizationService.delete("/:orgId", async (req, res) => {
    try {
        const result = await organizationUtil.delete(req.params.orgId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = organizationService;