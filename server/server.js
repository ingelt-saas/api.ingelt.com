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

// DB Config
const db = require("./database/connection");

// TODO: Routes Config

// TEST API
app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO MOVIE_REVIEWS (movie_name, movie_review) VALUES ('interstellar', 'Awesome Movie!!');";

  db.query(sqlInsert, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Done Inserting!");
      res.status(200).json({
        message: "Hello World",
      });
    }
  });
});

// App Listen Config
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
