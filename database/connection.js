require("dotenv").config();

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "data/portal.sqlite",
  },
  useNullAsDefault: true,
});

module.exports = knex;
