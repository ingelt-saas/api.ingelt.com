// APP Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// App Config
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Services Config
const ingeltServices = require("./services/ingelt");
const studentServices = require("./services/student");
const adminServices = require("./services/admin");
const teacherServices = require("./services/teacher");
app.use("/ingelt", ingeltServices);
app.use("/student", studentServices);
app.use("/admin", adminServices);
app.use("/teacher", teacherServices);

// Auth Config
const auth = require("./auth");
app.use("/auth", auth);

// get images route
const image = require("./assets/getimage");
app.use("/images", image);

// mail service
const mailService = require("./mail");
app.use("/mail", mailService);

// DB and Server Config
const PORT = process.env.PORT || 8000;
const db = require("./models");
require("./models/associations");

// TODO: FORCE ALTER ONLY FOR DEV ENVIRONMENT { alter: true, force: true }
db.sequelize.sync({ alter: true }).then(() => {
  // App Listen
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
