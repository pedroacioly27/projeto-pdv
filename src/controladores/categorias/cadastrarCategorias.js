const knex = require('../../conexao');


const cadastrarCategoria = async (req, res) => {
    const { descricao } = req.body

    try {
        const BuscarCategoria = await knex('categorias').where({ descricao }).first()
        if (BuscarCategoria) {
            return res.status(400).json({ mensagem: 'Categoria já cadastrada' })
        }
        const cadastro = await knex('categorias').insert({ descricao }).returning(['*'])
        return res.status(201).json({
            mensagem: `Categoria:${descricao} cadastrada com sucesso`
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = cadastrarCategoria;