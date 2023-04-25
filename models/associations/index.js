// Sequelize
const Sequelize = require("sequelize");

// Models
const db = require("..");
const Admin = db.admin;
const Assignment = db.assignment;
const Batch = db.batch;
const Library = db.library;
const Notes = db.notes;
const Organisation = db.organisation;
const Student = db.student;
const Submission = db.submission;
const Teacher = db.teacher;
const MockTest = db.mockTest;
const MockTestMarks = db.mockTestMarks;
const OrgImages = db.orgImages;
const BatchesTeachers = db.BatchesTeachers;
const StudentApplied = db.studentApplied;
const Discussion = db.discussion;

// Associations

// ORGANISATION ADMIN
Organisation.hasOne(Admin);
Admin.belongsTo(Organisation, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// ORGANISATION BATCH
Organisation.hasMany(Batch);
Batch.belongsTo(Organisation, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// ORGANISATION - DISCUSSION
Organisation.hasMany(Discussion);
Discussion.belongsTo(Organisation)

// ORGANISATION - LIBRARY
Organisation.hasMany(Library);
Library.belongsTo(Organisation);

// BATCH TEACHER
Batch.belongsToMany(Teacher, { through: BatchesTeachers });
Teacher.belongsToMany(Batch, { through: BatchesTeachers });

Batch.hasMany(BatchesTeachers);
BatchesTeachers.belongsTo(Batch);
Teacher.hasMany(BatchesTeachers);
BatchesTeachers.belongsTo(Teacher);

// BATCH STUDENT
Batch.hasMany(Student);
Student.belongsTo(Batch, {
  foreignKey: {
    type: Sequelize.UUID,
  },
});

// BATCH - NOTES
Batch.hasMany(Notes);
Notes.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// // TEACHER - NOTES
// Teacher.hasMany(Notes);
// Notes.belongsTo(Teacher, { as: 'uploader' });

// // ADMIN NOTES
// Admin.hasMany(Notes);
// Notes.belongsTo(Admin, { as: 'uploader' })

// BATCH - ASSIGNMENT
Batch.hasMany(Assignment);
Assignment.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// TEACHER - ASSIGNMENTS
Teacher.hasMany(Assignment);
Assignment.belongsTo(Teacher, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// SUBMISSION - ASSIGNMENT - STUDENT

Assignment.hasMany(Submission);
Student.hasMany(Submission);
Submission.belongsTo(Assignment, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

Submission.belongsTo(Student, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// MOCKTEST - BATCH
Batch.hasMany(MockTest);
MockTest.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// MOCKTEST - TEACHER
Teacher.hasMany(MockTest);
MockTest.belongsTo(Teacher, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// MOCKTESTMARKS - MOCKTEST - STUDENT
MockTest.hasMany(MockTestMarks);
MockTestMarks.belongsTo(MockTest);
Student.hasOne(MockTestMarks);
MockTestMarks.belongsTo(Student);

// ORGANISATION - ORGIMAGES
Organisation.hasMany(OrgImages);
OrgImages.belongsTo(Organisation, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// STUDENT APPLIED
Student.belongsToMany(Organisation, { through: StudentApplied });
Organisation.belongsToMany(Student, { through: StudentApplied });
