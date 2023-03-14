const express = require("express");
const adminUtil = require("../../utils/admin");
const adminService = express.Router();

// create new admin 
adminService.post("/", async (req, res) => {
    try {
        const result = await adminUtil.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get all admin 
adminService.get("/", async (req, res) => {
    try {
        const result = await adminUtil.read();
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get a admin by admin id  
adminService.get("/:adminId", async (req, res) => {
    try {
        const result = await adminUtil.readById(req.params.adminId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// update admin
adminService.put("/:adminId", async (req, res) => {
    try {
        const result = await adminUtil.update(req.params.adminId, req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

// delete admin
adminService.delete("/:adminId", async (req, res) => {
    try {
        const result = await adminUtil.delete(req.params.adminId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = adminService;
