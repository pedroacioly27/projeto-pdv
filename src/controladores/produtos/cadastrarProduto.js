const knex = require("../../conexao");
const { uploadFile } = require("../../storage")

const cadastrarProduto = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { file } = req
    try {
        const categoria = await knex('categorias').where({ id: categoria_id }).first()
        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada!' })
        }
        if (file) {
            const arquivo = await uploadFile(
                `imagens/${file.originalname}`,
                file.buffer,
                file.mimetype
            )

            const cadastroProduto = await knex('produtos')
                .insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem: arquivo.url })
                .returning(['*'])

            return res.status(201).json(cadastroProduto[0])
        }
        const cadastroProduto = await knex('produtos')
            .insert({ descricao, quantidade_estoque, valor, categoria_id })
            .returning(['*'])

        return res.status(201).json(cadastroProduto[0])

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}


module.exports = cadastrarProduto