const knex = require('../../conexao');


const atualizarCategoria = async (req, res) => {
    const { descricao } = req.body
    const { id } = req.params
  
    try {
        const BuscarCategoria = await knex('categorias').where({ id }).first()
        if (!BuscarCategoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada' })
        }
        const validarCategoria = await knex('categorias').where({ descricao }).first()

        if (validarCategoria && BuscarCategoria.descricao !== validarCategoria.descricao) {
            return res.status(400).json({ mensagem: 'Categoria já cadastrada' })
        }
        const atualizar = await knex('categorias').update({ descricao }).where({ id }).returning(['*'])
        return res.status(201).json({
            mensagem: `Categoria:${atualizar[0].descricao} atualizada com sucesso`
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = atualizarCategoria;