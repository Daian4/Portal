const knex = require("knex");
const fs = require("fs");

// Configuração do Knex (certifique-se de que ela corresponda à sua configuração real)
const knexConfig = {
  client: "sqlite3", // O cliente de banco de dados que você está usando (exemplo: PostgreSQL)
  connection: {
    filename: "data/portal.sqlite",
  },
  useNullAsDefault: true, // Adiciona esta linha para evitar o aviso sobre valores padrão
};

// Carrega o conteúdo do arquivo SQL
const sql = fs.readFileSync("dump.sql", "utf8");

const db = knex(knexConfig);

db.raw(sql)
  .then(() => {
    console.log("Migração concluída com sucesso");
    process.exit(0); // Encerra o processo Node.js com sucesso
  })
  .catch((err) => {
    console.error("Erro durante a migração:", err);
    process.exit(1); // Encerra o processo Node.js com erro
  });
