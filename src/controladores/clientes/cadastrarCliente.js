const knex = require("../../conexao");

const cadastrarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;

  try {
    const emailExistente = await knex("clientes").where({ email });

    if (emailExistente.length > 0) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const cpfExistente = await knex("clientes").where({ cpf });

    if (cpfExistente.length > 0) {
      return res.status(400).json({ mensagem: "cpf já cadastrado" });
    }
    const clienteCadastrado = await knex("clientes")
      .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
      .returning("*");

    return res.status(201).json(clienteCadastrado[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = cadastrarCliente;
