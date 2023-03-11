// Sequelize
const Sequelize = require("sequelize");

// Models
const db = require("..");
const Admin = db.admin;
const Assignment = db.assignment;
const Batch = db.batch;
const Discussion = db.discussion;
const Document = db.document;
const Notes = db.notes;
const Organisation = db.organisation;
const Student = db.student;
const Submission = db.submission;
const Teacher = db.teacher;
const MockTest = db.mockTest;
const MockTestMarks = db.mockTestMarks;
const OrgImages = db.orgImages;

// Associations

// ORGANISATION ADMIN
Organisation.hasOne(Admin);
Admin.belongsTo(Organisation, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// ORGANISATION DOCUMENT
Organisation.hasMany(Document);
Document.belongsTo(Organisation, {
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

// BATCH TEACHER
Batch.hasMany(Teacher);
Teacher.belongsToMany(Batch, { through: "BatchTeacher" });

// BATCH STUDENT
Batch.hasMany(Student);
Student.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// BATCH - DISCUSSION
Batch.hasMany(Discussion);
Discussion.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// BATCH - NOTES - TEACHER
Batch.hasMany(Notes);
Teacher.hasMany(Notes);
Notes.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});
Notes.belongsTo(Teacher, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// BATCH - ASSIGNMENT
Batch.hasMany(Assignment);
Assignment.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// SUBMISSION - ASSIGNMENT - STUDENT
Submission.belongsTo(Assignment);
Submission.belongsTo(Student);
Assignment.hasMany(Submission);
Student.hasMany(Submission);

// MOCKTEST - BATCH
Batch.hasMany(MockTest);
MockTest.belongsTo(Batch, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});

// MOCKTESTMARKS - MOCKTEST - STUDENT
MockTest.hasMany(MockTestMarks);
MockTestMarks.belongsTo(MockTest);
Student.hasOne(MockTestMarks);

// ORGANISATION - ORGIMAGES
Organisation.hasMany(OrgImages);
OrgImages.belongsTo(Organisation, {
  foreignKey: {
    allowNull: false,
    type: Sequelize.UUID,
  },
});
