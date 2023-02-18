// import model

const { batchModel, studentModel, teacherModel, docModel, assignmentModel, submissionModel, discussionModel } = require('../models/index');

// create a new batch
// Query No: 13
batchModel.create({
    org_id: 'organization id',
    name: 'batch name',
    reg_date: 'batch registration date',
    active: 'boolean value',
    end_date: 'batch end date',
    classroom_link: 'class room link',
    average_band: 'number',
    total_average_band: 'number',
});

// delete student from a batch
// Query No : 14
studentModel.update({ batch_id: 'batch id' }, {
    where: {
        id: 'student id'
    }
});

// delete teacher from a batch
// Query No : 15
teacherModel.update({ batch_id: 'batch id' }, {
    where: {
        id: 'teacher id'
    }
});

// delete organization document
// Query No : 16
docModel.delete({
    where: {
        id: 'doc id',
        org_id: 'organization id'
    }
});

// delete batch document
// Query No : 17
docModel.delete({
    where: {
        id: 'doc id',
        batch_id: 'batch id'
    }
});

// get one student from a batch
// Query No : 18
studentModel.findOne({
    where: {
        batch_id: 'batch id'
    }
});

// get one teacher from a batch
// Query No : 19
teacherModel.findOne({
    where: {
        batch_id: 'batch id'
    }
});

// get one document from the organization
// Query No : 20
docModel.findOne({
    where: {
        org_id: 'organization id'
    }
});

// get one assignment from batch 
// Query No : 21
assignmentModel.findOne({
    where: {
        batch_id: 'batch id'
    }
});

// get all submission per assignment
// Query No : 22
submissionModel.find({
    where: {
        assignment_id: 'assignment id'
    },
    order: [
        ['id', 'DESC']
    ]
});

// get all submission per student
// Query No : 23
submissionModel.find({
    where: {
        student_id: 'student id'
    },
    order: [
        ['id', 'DESC']
    ]
});

// get discussion per batch
// Query No : 24
discussionModel.find({
    where: {
        batch_id: 'batch id'
    },
    order: [
        ['id', 'DESC']
    ]
});
