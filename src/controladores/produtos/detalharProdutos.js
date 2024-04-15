const knex = require("../../conexao");

const detalharProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await knex("produtos").where({ id }).first();

    if (!produto) {
      return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.json(produto);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = detalharProduto;
