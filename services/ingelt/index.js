const express = require("express");
const router = express.Router();

// InGelt Services Import
const studentService = require("./student");
const assignmentService = require("./assignment");
const batchService = require("./batch");
const discussionService = require("./discussion");
const mockTestService = require("./mockTest");
const testMarksService = require("./mockTestMarks");
const notesService = require("./notes");
const libraryService = require("./library");
const orgService = require("./organization");
const submissionService = require("./submission");
const teacherService = require("./teacher");
const adminService = require("./admin");
const subscriberService = require("./subscriber");
const blogService = require("./blog");
const CommunityQueryService = require("./communityQuery");
const ieltsPrepService = require("./ieltsPrep");
const universityQueryService = require("./universityQuery");
const loanQueryService = require("./loanQuery");
const visaQueryService = require("./visaQuery");
const findIELTSQueryService = require("./findIELTSQuery");
const file = require('../../aws/file');
const moduleService = require("./modules");
const universityService = require("./university");
const { authentication, getInGeltAdmin } = require("./ingelt");
const verifyJWT = require('../../middleware/verifyJWT');

// get file
router.get('/get-file', async (req, res) => {
    try {
        const key = req.headers.awskey;
        const result = await file(key);
        res.send(result);
    } catch (err) { res.send('') }
});

// inGelt authentication
router.post('/login', authentication);

// get inGelt admin
router.get('/verify-ingelt', verifyJWT, getInGeltAdmin);

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

// InGelt Mock Test Router
router.use("/mocktest", mockTestService);

// InGelt Mock Test Marks Router
router.use("/mocktestmarks", testMarksService);

// InGelt Notes Router
router.use("/notes", notesService);

// InGelt Library Router
router.use("/library", libraryService);

// InGelt Modules Router
router.use("/modules", moduleService);

// InGelt Organization Router
router.use("/organization", orgService);

// InGelt Submission Router
router.use("/submission", submissionService);

// InGelt Teacher Router
router.use("/teacher", teacherService);

// InGelt Subscriber Router
router.use("/subscriber", subscriberService);

// InGelt Blog Router
router.use("/blog", blogService);

//InGelt Community Query Router
router.use("/community-query", CommunityQueryService);

//InGelt IELTS Prep Router
router.use("/ieltsprep", ieltsPrepService);

//InGelt University Query Router
router.use("/university-query", universityQueryService);

//InGelt Loan Query Router
router.use("/loan-query", loanQueryService);

//InGelt Visa Query Router
router.use("/visa-query", visaQueryService);

//InGelt Find IELTS Query Router    
router.use("/find-ielts-query", findIELTSQueryService);

// InGelt University Router
router.use("/university", universityService);

module.exports = router;
