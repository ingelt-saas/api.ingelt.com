const { Sequelize } = require("sequelize");

// connect db with sequelize
const sequelize = new Sequelize();

sequelize.authenticate()
  .then(res => console.log(res))
  .catch(err => console.log(err))

module.exports = { sequelize };
