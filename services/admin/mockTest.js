const express = require("express");
const mockTestUtil = require("../../utils/mockTest");
const mockTestMarksUtil = require("../../utils/mockTestMarks");
const mockTestService = express.Router();

// add new mock test
mockTestService.post("/", async (req, res) => {
  try {
    // Assuming orgId is provided in the request body
    req.body.uploaderId = req.decoded.id;
    req.body.uploaderType = "Admin";
    req.body.organizationId = req.decoded.organizationId;

    // check mock test by mock test name
    const getMockTest = await mockTestUtil.readByName(
      req.body.name,
      req.decoded.organizationId
    );
    if (getMockTest) {
      return res
        .status(208)
        .send({ message: "Exist this mock test, try to use a different name" });
    }

    const result = await mockTestUtil.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// get all mock test
mockTestService.get("/getall", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const result = await mockTestUtil.getByOrg(orgId);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// update mock test
mockTestService.put("/:mockId", async (req, res) => {
  try {
    const mockId = req.params.mockId;
    const result = await mockTestUtil.update(mockId, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// save mock test marks
mockTestService.post("/mockTestMarks", async (req, res) => {
  try {
    const newMarks = req.body;
    const result = await mockTestMarksUtil.create(newMarks);
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// update mock test marks
mockTestService.put("/mockTestMarks/:mockTestId", async (req, res) => {
  try {
    const updateData = req.body;
    const result = await mockTestMarksUtil.update(
      req.params.mockTestId,
      updateData
    );
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get all student in the organization with mock test marks by mock test
mockTestService.get("/mockTestMarks/:mockTestId", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;
    const marks = await mockTestMarksUtil.getTestMarksWithStudent(
      req.params.mockTestId,
      orgId,
      parseInt(pageNo),
      parseInt(limit),
      s
    );
    res.status(200).json(marks);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete mock test
mockTestService.delete("/:mockId", async (req, res) => {
  try {
    const mockId = req.params.mockId;

    // delete mock test marks
    await mockTestMarksUtil.deleteByMockId(mockId);

    // delete mock test
    await mockTestUtil.delete(mockId);
    res.status(202).json({ message: "OK" });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = mockTestService;
