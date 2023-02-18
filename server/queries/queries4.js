// import model

const { organisationModel, adminModel, teacherModel, docModel, assignmentModel, submissionModel, discussionModel } = require('../models/index');

// read organization
// query No : 37
organisationModel.find({
    order: [
        ['id', 'DESC']
    ]
});

// read admin
// query No : 38
adminModel.find({
    order: [
        ['id', 'DESC']
    ]
});

// update organization
// query No : 39
const organizationUpdateData = {};
organisationModel.update(organizationUpdateData, {
    where: {
        id: 'organization id'
    }
});

// update admin
// query No : 40
const adminUpdateData = {};
adminModel.update(adminUpdateData, {
    where: {
        id: 'admin id'
    }
});
// delete organization
// query No : 41
organisationModel.delete({
    where: {
        id: 'organization id'
    }
});
// delete admin
// query No : 42
adminModel.delete({
    where: {
        id: 'admin id'
    }
});