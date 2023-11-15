const knex = require("../../database/connection");

const createTicket = async (req, res) => {
  const { title, description, status } = req.body;
  const { user } = req;

  try {
    const newRequest = await knex("tickets")
      .insert({
        title,
        description,
        user_id: user.id,
        status,
      })
      .returning("*");

    if (!newRequest) {
      return res
        .status(400)
        .json({ mensagem: "Não foi possível enviar solicitação" });
    }

    return res.status(201).json({ mensagem: "solicitação enviada!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const createComment = async (req, res) => {
  const { message } = req.body;
  const { user } = req;
  const { id } = req.params;

  if (!message) {
    return res.status(400).json({ mensagem: "message é obrigatório" });
  }

  try {
    const query = await knex("comments")
      .insert({
        message,
        ticket_id: id,
        user_id: user.id,
      })
      .returning("*");

    return res.status(201).json(query);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const updateTicket = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ mensagem: "status obrigatório!" });
  }

  try {
    const query = await knex("comments")
      .count("id")
      .where("ticket_id", id)
      .first();

    if (Number(query.count) <= 0) {
      return res.status(400).json({ messagem: "Não há comentários" });
    }

    const updateQuery = await knex("tickets")
      .where("id", id)
      .update({ status })
      .returning("*");

    return res.status(200).json(updateQuery[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const getcomments = async (req, res) => {
  const { id } = req.params;
  try {
    const query = await knex("comments").where("ticket_id", id);

    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  }
};

const getTickets = async (req, res) => {
  const {user} = req;

  try {
    const query = await knex("tickets").where("user_id", user.id);

    return res.status(200).json(query);
  } catch (error) {
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  } 
}

const getTicket = async (req, res) => {
  const {user} = req;
  const {id} = req.params

  try {
    const query = await knex("tickets").where("user_id", user.id).where('id', id).first()
    
    if(!query){
      return res.status(404).json({mensagem: "Não encontrado"})
    }

    return res.status(200).json(query);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensagem: "erro interno do servidor" });
  } 
}
module.exports = { createTicket, createComment, updateTicket, getcomments, getTickets, getTicket };
