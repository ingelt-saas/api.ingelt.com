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

// DB Postgres Config
require("./database/connection");

// Routes Config
app.get("/", (req, res) => {
  res.send("Hello World");
});

// App Listen Config
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
