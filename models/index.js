// "use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], {
    ...config,
    dialectOptions: {
      // useUTC: false,
      dateStrings: true, // for reading from database
    },
    timezone: "+05:30", // for writing to database
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    dialectOptions: {
      // useUTC: false,
      dateStrings: true, // for reading from database
    },
    timezone: "+05:30", // for writing to database
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.admin = require("./admin.model")(sequelize, Sequelize);
db.assignment = require("./assignment.model")(sequelize, Sequelize);
db.batch = require("./batch.model")(sequelize, Sequelize);
db.discussion = require("./discussion.model")(sequelize, Sequelize);
db.library = require("./library.model")(sequelize, Sequelize);
db.notes = require("./notes.model")(sequelize, Sequelize);
db.organisation = require("./organization.model")(sequelize, Sequelize);
db.orgImages = require("./orgImages.model")(sequelize, Sequelize);
db.student = require("./student.model")(sequelize, Sequelize);
db.submission = require("./submission.model")(sequelize, Sequelize);
db.teacher = require("./teacher.model")(sequelize, Sequelize);
db.mockTest = require("./mockTest.model")(sequelize, Sequelize);
db.mockTestMarks = require("./mockTestMarks.model")(sequelize, Sequelize);
db.studentApplied = require("./studentApplied.model")(sequelize, Sequelize);
db.blog = require("./blog.model")(sequelize, Sequelize);
db.revenue = require("./revenue.model")(sequelize, Sequelize);
db.discussionImages = require("./discussionImages.model")(sequelize, Sequelize);
db.communityQuery = require("./communityQuery.model")(sequelize, Sequelize);
db.universityQuery = require("./universityQuery.model")(sequelize, Sequelize);
db.ieltsPrep = require("./ieltsPrepQuery.model")(sequelize, Sequelize);
db.loanQuery = require("./loanQuery.model")(sequelize, Sequelize);
db.visaQuery = require("./visaQuery.model")(sequelize, Sequelize);
db.findIELTSQuery = require("./findIELTSQuery.model")(sequelize, Sequelize);
db.modules = require("./modules.model")(sequelize, Sequelize);
db.studentShortlist = require("./studentShortlist.model")(sequelize, Sequelize);
db.university = require("./university.model")(sequelize, Sequelize);
db.inGelt = require("./ingelt.model")(sequelize, Sequelize);
db.category = require("./category.model")(sequelize, Sequelize);
db.discussionReport = require("./discussionReport.model")(sequelize, Sequelize);
db.course = require("./course.model")(sequelize, Sequelize);
db.event = require("./event.model")(sequelize, Sequelize);
db.eventBooking = require("./eventBooking.model")(sequelize, Sequelize);
db.payment = require("./payment.model")(sequelize, Sequelize);
db.session = require("./session.model")(sequelize, Sequelize);
db.coupon = require("./coupon.model")(sequelize, Sequelize);
db.studentFeedback = require("./studentFeedback.model")(sequelize, Sequelize);

module.exports = db;
