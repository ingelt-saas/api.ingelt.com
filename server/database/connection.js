const dbKeys = require("./keys");

const { Pool } = require("pg");

const pgClient = new Pool({
  user: dbKeys.pgUser,
  host: dbKeys.pgHost,
  database: dbKeys.pgDatabase,
  password: dbKeys.pgPassword,
  port: dbKeys.pgPort,
});

// On Connection
pgClient.on("connect", (client) => {
  console.log("Postgres Connected");
});
