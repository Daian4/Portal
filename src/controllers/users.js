const knex = require("../../database/connection");
const bcrypt = require("bcrypt");
const passwordJWT = process.env.passwordJWT;
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    
    const passwordCrypt = await bcrypt.hash(password, 10);
    const query = await knex("users").where("email", email).first();
   
    if (query) {
      return res.status(400).json({ mensagem: "O Email já existe" });
    }

    
    const newUser = await knex("users")
      .insert({
        name,
        email,
        phone,
        password: passwordCrypt,
      })
      .returning(["id", "name", "email", "phone"]);

    if (!newUser) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível cadastrar o usuário" });
    }


    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });

  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("users").where("email", email).first();
    if (!user) {
      return res
        .status(400)
        .json({ mensagem: "Email e/ou senha estão incorretos" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .status(400)
        .json({ mensagem: "Email e/ou senha estão incorretos" });
    }

    const token = jwt.sign({ id: user.id }, passwordJWT, { expiresIn: "8h" });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const getUser = async (req, res) => {
  const { user } = req;
  
  try {
    const userProfile = await knex("users").where("id", user.id).first();

    const { id, password, ...userDetail } = userProfile;

    return res.status(200).json(userDetail);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  registerUser,
  login,
  getUser,
};
