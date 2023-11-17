const knex = require("knex");
require("dotenv").config();

let connectionConfig;

if (process.env.ENV === "production") {
  connectionConfig = {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    },
  };
} else {
  connectionConfig = {
    client: "sqlite3",
    connection: {
      filename: "data/portal.sqlite",
    },
    useNullAsDefault: true,
  };
}

const db = knex(connectionConfig);
module.exports = db;
