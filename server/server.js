// APP Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// App Config
const app = express();

// Middlewares Config
app.use(bodyParser.json());
app.use(cors());

// TODO: Routes Config

// App Listen Config
const PORT = process.env.PORT || 8000;
// DB Config
const db = require("./models");
db.sequelize.sync().then((req) => {
  // App Listen
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
