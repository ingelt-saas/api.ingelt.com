const express = require('express');
const organizationRoute = require('./organizationRoute');
const adminRoute = require('./adminRoute');
const batchRoute = require('./batchRoute');
const teacherRoute = require('./teacherRoute');
const studentRoute = require('./studentRoute');
const documentRoute = require('./docRoute');
const discussionRoute = require('./discussionRoute');
const submissionRoute = require('./submissionRoute');
const assignmentRoute = require('./assignmentRoute');

const router = express();

router.use('/organization', organizationRoute);
router.use('/admin', adminRoute);
router.use('/batch', batchRoute);
router.use('/teacher', teacherRoute);
router.use('/student', studentRoute);
router.use('/document', documentRoute);
router.use('/discussion', discussionRoute);
router.use('/submission', submissionRoute);
router.use('/assignment', assignmentRoute);

module.exports = router;