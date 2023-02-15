
// import model
const { batchModel, teacherModel, studentModel, assignmentModel, organizationModel, docModel } = require('../models/index');

// get all batch . Query No : 1
batchModel.findAll({
    order: [
        ['id', 'DESC']
    ]
});

// get all teacher in a batch . Query No : 2
teacherModel.findAll({
    where: {
        batch_id: 'batch id'
    },
    order: [
        ['name', 'DESC']
    ]
});

// get all student in a batch . Query No : 3
studentModel.findAll({
    where: {
        batch_id: 'batch id'
    },
    order: [
        ['name', 'DESC']
    ]
});

// get all assignment in a batch. Query No : 4
assignmentModel.findAll({
    where: {
        batch_id: 'batch id'
    },
    order: [
        ['name', 'DESC']
    ]
});

// get all organization docs . Query No : 5
docModel.findAll({
    where: {
        org_id: 'organization id'
    },
    order: [
        ['id', 'DESC']
    ]
});

// create a teacher in a batch . Query No : 6
teacherModel.create({
    batch_id: '', // batch id, foreign key
    name: '', // string 
    gender: '', // string , Male OR Female OR Other 
    email: '',  //string
    password: '', // string
    expertise: '', // string
    dob: '', // date
    phone_no: '', // string
    city: '', // string
    state: '', // string
    country: '', // string
    pincode: '', // string
    work_exp: '', // floating number
    reg_date: '', // date
    active: '', // boolean
    syllabus: '' // number
});

// create student in a batch . Query No : 7
studentModel.create({
    batch_id: '', // batch id, foreign key
    name: '', // string 
    email: '',  //string
    password: '', // string
    phone_no: '', // string
    gender: '', // string , Male OR Female OR Other 
    city: '', // string
    state: '', // string
    country: '', // string
    pincode: '', // string
    dob: '', // date
    reg_date: '', // date
    active: '', // boolean
    target_score: '', // floating number
    previous_score: '', // floating number
    average_band: '', // number
    total_average_band: '' // number
});

// create a doc in a batch
// Query No: 8 and 9
docModel.create({
    org_id: 'organization id',
    batch_id: 'batch id',
    file: 'file',
    filesize: 'file size',
    date: ''
});

// update teachers in an batch
// Query No 10
const teacherUpdateData = {};
teacherModel.update(teacherUpdateData, {
    where: {
        id: 'teacher id'
    }
});

// update batch info .
// Query No : 11
const batchUpdateData = {};
batchModel.update({ batchUpdateData }, {
    where: {
        id: 'batch id'
    }
});

