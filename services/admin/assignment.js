const assignmentUtil = require("../../utils/assignment");
const assignmentService = require("express").Router();
const { memoryStorage } = require("multer");
const multer = require("multer");
const storage = memoryStorage();
const upload = multer({ storage });
const awsUpload = require("../../aws/upload");
const deleteFile = require("../../aws/delete");

// add new assignment
assignmentService.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const newAssignment = req.body;
    newAssignment.name = file.originalname;
    newAssignment.fileSize = file.size;
    newAssignment.uploaderId = req.decoded.id;
    newAssignment.uploaderType = 'Admin';
    newAssignment.organizationId = req.decoded.organizationId;

    awsUpload(file, "teacher/assignments", async (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        newAssignment.file = data.Key;
        const result = await assignmentUtil.create(newAssignment);
        res.status(201).json(result);
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

// get assignment by organization
assignmentService.get("/getall", async (req, res) => {
  try {
    const orgId = req.decoded.organizationId;
    const { s, pageNo, limit } = req.query;
    const assignments = await assignmentUtil.getAssignmentByOrg(orgId, parseInt(pageNo), parseInt(limit), s);
    // let result = [];
    // for (let assignment of assignments) {
    //   const res = await submissionUtil.getSubmissionByAssignment(assignment.id);
    //   result.push({ assignment: assignment.name, submission: res.length });
    // }
    res.json(assignments);
  } catch (err) {
    res.status(400).send(err);
  }
});

// delete assignment
assignmentService.delete("/:assignmentId", async (req, res) => {
  const assignmentId = req.params.assignmentId;
  try {
    let getAssignment = await assignmentUtil.readById(assignmentId);
    if (getAssignment) {
      getAssignment = getAssignment.get({ plain: true });
    }
    // delete assignment from cloud
    getAssignment.file && (await deleteFile(getAssignment.file));

    await assignmentUtil.delete(assignmentId);
    res.sendStatus(202);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = assignmentService;
