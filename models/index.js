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
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
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
db.document = require("./document.model")(sequelize, Sequelize);
db.notes = require("./notes.model")(sequelize, Sequelize);
db.organisation = require("./organisation.model")(sequelize, Sequelize);
db.student = require("./student.model")(sequelize, Sequelize);
db.submission = require("./submission.model")(sequelize, Sequelize);
db.teacher = require("./teacher.model")(sequelize, Sequelize);
db.mockTest = require("./mockTest.model")(sequelize, Sequelize);
db.mockTestMarks = require("./mockTestMarks.model")(sequelize, Sequelize);

module.exports = db;