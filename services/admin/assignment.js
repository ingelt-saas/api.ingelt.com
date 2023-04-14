const assignmentUtil = require('../../utils/assignment');
const submissionUtil = require('../../utils/submission');
const assignmentService = require('express').Router();

// get assignment by batch 
assignmentService.get('/:batchId', async (req, res) => {
    try {
        const batchId = req.params.batchId;
        const assignments = await assignmentUtil.getAssignmentsByBatch(batchId);
        let result = [];
        for (let assignment of assignments) {
            const res = await submissionUtil.getSubmissionByAssignment(assignment?.id);
            result.push({ assignment: assignment.name, submission: res.length });
        }
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = assignmentService;