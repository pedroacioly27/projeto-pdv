const knex = require("../../conexao");

const listarPedidos = async (req, res) => {
    const { cliente_id } = req.query

    try {
        const lista = []
        let pedidos = await knex('pedidos')
        if (cliente_id) {
            const validarCliente = await knex('clientes').where({ id: cliente_id }).first()
            if (!validarCliente) {
                return res.status(404).json({ mensagem: 'Cliente não encontrado!' })
            }
            pedidos = await knex('pedidos').where({ cliente_id })
        }

        for (const pedido of pedidos) {
            const pedidoProdutos = await knex('pedido_produtos').where({ pedido_id: pedido.id })
            const formatado = {
                pedido,
                pedidoProdutos
            }
            lista.push(formatado)

        }
        return res.status(200).json(lista)

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}


module.exports = listarPedidos