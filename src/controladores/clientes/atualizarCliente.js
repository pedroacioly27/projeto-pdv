const knex = require("../../conexao");

const atualizarCliente = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } =
    req.body;
  const { id } = req.params;

  try {
    const clienteAtual = await knex("clientes").where({ id }).first();
    const emailExistente = await knex("clientes").where({ email }).first();
    const cpfExistente = await knex("clientes").where({ cpf }).first();

    if (!clienteAtual) {
      return res
        .status(404)
        .json({ menssagem: `Não existe cliente com id ${id}` });
    }

    if (emailExistente) {
      if (clienteAtual.email !== emailExistente.email) {
        return res.status(400).json({ mensagem: "Email já cadastrado" });
      }
    }
    if (cpfExistente) {
      if (clienteAtual.cpf !== cpfExistente.cpf) {
        return res.status(400).json({ mensagem: "CPF já cadastrado" });
      }
    }

    const clienteAtualizado = await knex("clientes")
      .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
      .where({ id })
      .returning("*");

    return res.status(201).json(clienteAtualizado[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = atualizarCliente;
