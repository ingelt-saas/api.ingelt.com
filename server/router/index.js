const express = require('express');
const organizationRoute = require('./organizationRoute');
const adminRoute = require('./adminRoute');
const batchRoute = require('./batchRoute');
const teacherRoute = require('./teacherRoute');

const router = express();

router.use('/organization', organizationRoute);
router.use('/admin', adminRoute);
router.use('/batch', batchRoute);
router.use('/teacher', teacherRoute);

module.exports = router;