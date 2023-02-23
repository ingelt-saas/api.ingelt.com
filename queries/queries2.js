
const { batchModel, submissionModel, discussionModel, organizationModel } = require('../models/index');

//get all batches under the teacher
// Query No : 25
batchModel.find({
    where: {
        teacher_id: 'teacher id'
    }
});


// create classroom or update classroom
// Query No : 26 / 29
batchModel.update({ classroom_link: '' }, {
    where: {
        id: 'batch id'
    }
});

// update submission per student
// Query No : 27
const updateSubmissionData = {};
submissionModel.update(updateSubmissionData, {
    where: {
        id: 'submission id',
        student_id: 'student id'
    }
});

// create discussion per batch
// Query No : 28
discussionModel.create({
    batch_id: 'batch id',
    sender_id: 'sender id',
    sender_name: 'sender name',
    message: 'message',
    datetime: 'date and time '
});

// delete classroom link
// Query No : 30
batchModel.update({ classroom_link: '' }, {
    where: {
        id: 'batch id'
    }
});

// get submission by student id and assignment id
// Query No : 32
batchModel.findOne({
    where: {
        assignment_id: 'assignment id',
        student_id: 'student id'
    }
});

// create submission by assignment
// Query No : 34
submissionModel.create({
    assignment_id: 'assignment id',
    student_id: 'student id',
    file: 'file link ',
    submission_date: 'submission date',
    evaluated: 'boolean value',
    scores: ' scores ',
    remarks: 'remarks',
});

// create organization
// Query No : 35
organizationModel.create({
    name: ' name ',
    owner_name: 'owner name',
    phone_no: 'phone no',
    email: 'email',
    password: ' password ',
    logo: 'logo link',
    website: 'website link',
    address: 'address',
    state: 'state',
    country: 'country',
    registration_date: 'registration date',
    plan: 'plan',
    active: 'boolean value ( ex: true or false )'
});
