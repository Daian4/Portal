const knex = require("knex");
const fs = require("fs");


const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "data/portal.sqlite",
  },
  useNullAsDefault: true,
};

const sql = fs.readFileSync("dump.sql", "utf8");

const db = knex(knexConfig);

db.raw(sql)
  .then(() => {
    console.log("Migração concluída com sucesso");
    process.exit(0); 
  })
  .catch((err) => {
    console.error("Erro durante a migração:", err);
    process.exit(1)
  });
