const knex = require("../../conexao");
const { uploadFile, excluirArquivo } = require("../../storage")


const atualizarProduto = async (req, res) => {
    const { id } = req.params
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req

    try {
        const produto = await knex('produtos').where({ id }).first()
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrada!' })

        }
        const categoria = await knex('categorias').where({ id: categoria_id }).first()
        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada!' })
        }
        if (file) {
            if (produto.produto_imagem) {
                const url = produto.produto_imagem
                const patch = url.split(process.env.URL_BLACKBLAZE)
                console.log(patch[1]);
                await excluirArquivo(patch[1])
            }
            const arquivo = await uploadFile(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype
            )
            const atualizarProduto = await knex('produtos')
                .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: arquivo.url })
                .where({ id }).returning(['*'])


            return res.status(201).json(atualizarProduto[0])
        }

        const atualizarProduto = await knex('produtos').update({ descricao, quantidade_estoque, valor, categoria_id }).where({ id }).returning(['*'])

        return res.status(201).json(atualizarProduto[0])
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}


module.exports = atualizarProduto