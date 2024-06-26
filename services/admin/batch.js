const express = require("express");
const batchUtil = require("../../utils/batch");
const studentUtil = require("../../utils/student");
const organizationUtil = require("../../utils/organization");
const batchService = express.Router();

// create new batch
batchService.post("/", async (req, res) => {
  try {
    req.body.organizationId = req.decoded.organizationId;
    const result = await batchUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get all batch with batch students and teachers by organization
batchService.get("/getall", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { pageno, limit } = req.query;
    const result = await batchUtil.batchesWithStuAndTea(orgId, parseInt(pageno), parseInt(limit));
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// search all batch with batch students and teachers by organization
batchService.get("/search", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageno, limit } = req.query;
    const result = await batchUtil.searchBatchesWithStuAndTea(orgId, s, parseInt(pageno), parseInt(limit));
    res.status(200).json(result);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// get a batch by batch id
batchService.get("/:batchId", async (req, res) => {
  try {
    const result = await batchUtil.readById(req.params.batchId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update batch
batchService.put("/:batchId", async (req, res) => {
  try {
    const result = await batchUtil.update(req.params.batchId, req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// end batch 
batchService.put('/endBatch/:batchId', async (req, res) => {
  try {
    const batchId = req.params.batchId;
    const orgId = req.decoded.organizationId;

    const getOrg = await organizationUtil.readById(orgId);
    let endBatches = 0;

    if (getOrg.endBatches && typeof getOrg.endBatches === 'number') {
      endBatches = parseInt(getOrg.endBatches);
    }

    // update batch students 
    await studentUtil.updateStudentsByBatch(batchId, { active: false, batchId: null });

    // update organization endBatches count
    await organizationUtil.update(orgId, { endBatches: endBatches + 1 });

    // delete batch 
    const result = await batchUtil.delete(batchId);
    res.json(result);

  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

// delete batch
batchService.delete("/:batchId", async (req, res) => {
  try {
    const result = await batchUtil.delete(req.params.batchId);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = batchService;
