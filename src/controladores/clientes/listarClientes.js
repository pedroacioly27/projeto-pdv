const knex = require("../../conexao");

const listarCliente = async (req, res) => {
  try {
    const clientes = await knex("clientes");
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
module.exports = listarCliente;
