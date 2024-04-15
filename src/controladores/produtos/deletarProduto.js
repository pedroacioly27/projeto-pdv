const knex = require("../../conexao");
const { excluirArquivo } = require("../../storage")


const deletarProduto = async (req, res) => {
    const { id } = req.params
    try {
        const validacao = await knex('pedido_produtos').where({ produto_id: id }).first()
        if (validacao) {
            return res.status(400).json({ mensagem: 'Não é permitido deletar produto cadastrado em pedidos' })
        }

        const produto = await knex('produtos').where({ id }).first()
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado!' })

        }
        if (produto.produto_imagem) {
            const url = produto.produto_imagem
            const patch = url.split(process.env.URL_BLACKBLAZE)
            console.log(patch[1]);
            await excluirArquivo(patch[1])
        }

        const deletar = await knex('produtos').where({ id }).del()
        if (deletar === 0) {
            return res.status(404).json({ mensagem: 'Produto não deletado!' })
        }
        return res.status(200).json({ mensagem: 'Produto deletado com sucesso!' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

}

module.exports = deletarProduto