const knex = require("../../database/connection");
const jwt = require("jsonwebtoken");
const passwordJWT = process.env.passwordJWT;

const checkLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  try {
    const token = authorization.replace("Bearer ", "").trim();

    const { id } = jwt.verify(token, passwordJWT);

    const compareId = await knex("users").where("id", id).first();

    if (!compareId) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const { password, ...user } = compareId;

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }
};

module.exports = checkLogin;
