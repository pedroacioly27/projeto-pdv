const knex = require("../../conexao");

const listarProdutos = async (req, res) => {
  try {
    const { categoria_id } = req.query;

    if (categoria_id) {
      const categoria = await knex("categorias").where({ id: categoria_id }).first();

      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada." })
      }

      const produtosEncontrados = await knex('produtos').where({ categoria_id })
      return res.status(200).json(produtosEncontrados)
    }

    const produtos = await knex('produtos')

    return res.status(200).json(produtos);

  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = listarProdutos;
