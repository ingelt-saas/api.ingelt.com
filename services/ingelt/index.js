const express = require("express");
const router = express.Router();

// InGelt Services Import
const studentService = require("./student");
const assignmentService = require("./assignment");
const batchService = require("./batch");
const discussionService = require("./discussion");
const docService = require("./document");
const mockTestService = require("./mockTest");
const testMarksService = require("./mockTestMarks");
const notesService = require("./notes");
const orgService = require("./organization");
const submissionService = require("./submission");
const teacherService = require("./teacher");
const adminService = require("./admin");

// InGelt Admin Router
router.use("/admin", adminService);

// InGelt Student Router
router.use("/student", studentService);

// InGelt Assignment Router
router.use("/assignment", assignmentService);

// InGelt Batch Router
router.use("/batch", batchService);

// InGelt Discussion Router
router.use("/discussion", discussionService);

// InGelt Document Router
router.use("/doc", docService);

// InGelt Mock Test Router
router.use("/mocktest", mockTestService);

// InGelt Mock Test Marks Router
router.use("/mocktestmarks", testMarksService);

// InGelt Notes Router
router.use("/notes", notesService);

// InGelt Organization Router
router.use("/organization", orgService);

// InGelt Submission Router
router.use("/submission", submissionService);

// InGelt Teacher Router
router.use("/teacher", teacherService);



module.exports = router;
