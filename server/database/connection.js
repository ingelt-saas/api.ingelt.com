const { Sequelize } = require("sequelize");

// connect db with sequelize
const sequelize = new Sequelize();
module.exports = { sequelize };
