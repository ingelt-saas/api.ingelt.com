// SERVER.JS
// DB Config
// const db = require("./database/connection");

// TEST API
// app.get("/", (req, res) => {
//   const sqlInsert =
//     "INSERT INTO MOVIE_REVIEWS (movie_name, movie_review) VALUES ('interstellar', 'Awesome Movie!!');";

//   db.query(sqlInsert, (err, result) => {
//     if (err) console.log(err);
//     else {
//       console.log("Done Inserting!");
//       res.status(200).json({
//         message: "Hello World",
//       });
//     }
//   });
// });

// THIS FILE
// const mysql = require("mysql");

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// module.exports = db;

// ENV
// DB_NAME="TestDB"
// DB_HOST="localhost"
// DB_USER="root"
// DB_PASSWORD="Nish2002"
// DB_PORT=3306
