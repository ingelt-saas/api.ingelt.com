// APP Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// App Config
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Services Config
const studentServices = require("./services/student");
app.use("/stu", studentServices);

// DB and Server Config
const PORT = process.env.PORT || 8000;
const db = require("./models");
require("./models/associations");

// TODO: FORCE ALTER ONLY FOR DEV ENVIRONMENT
db.sequelize.sync({ alter: true }).then((req) => {
  // App Listen
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
