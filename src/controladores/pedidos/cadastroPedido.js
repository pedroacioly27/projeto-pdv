const knex = require("../../conexao");
const transportador = require("../../email");
const compiladorHtml = require("../../utils/compiladorHtml");


const cadastrarPedido = async (req, res) => {
    const { cliente_id, pedido_produtos, observacao } = req.body

    try {
        const cliente = await knex('clientes').where({ id: cliente_id }).first()
        if (!cliente) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado!' })
        }

        let valorTotal = 0

        for (const pedido of pedido_produtos) {

            const produto = await knex('produtos').where({ id: pedido.produto_id }).first()

            if (!produto) {
                return res.status(404).json({ mensagem: `Produto com o id:${pedido.produto_id} não encontrado!` })
            }
            if (pedido.quantidade_produto > produto.quantidade_estoque) {
                return res.status(400).json({ mensagem: `${produto.descricao} sem estoque suficiente!` })
            }
            valorTotal += (produto.valor * pedido.quantidade_produto)

        }
        const registroPedido = await knex('pedidos').insert({ cliente_id, observacao, valor_total: valorTotal }).returning(['*'])

        const produtosPedido = []

        const html = await compiladorHtml('./src/templates/pedido.html', {
            nomeusuario: cliente.nome,
            numero: registroPedido[0].id

        })
        transportador.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${cliente.nome} <${cliente.email}>`,
            subject: 'Novo Pedido',
            html
        })

        for (const pedido of pedido_produtos) {
            const produto = await knex('produtos').where({ id: pedido.produto_id }).first()

            const pedidoAdicionado = await knex('pedido_produtos')
                .insert({
                    pedido_id: registroPedido[0].id,
                    produto_id: produto.id,
                    quantidade_produto: pedido.quantidade_produto,
                    valor_produto: produto.valor
                }).returning(['*'])
            produtosPedido.push(pedidoAdicionado[0])
            const baixaEstoque = await knex('produtos')
                .update({ quantidade_estoque: (produto.quantidade_estoque - pedido.quantidade_produto) })
                .where({ id: produto.id })
        }

        return res.status(201).json({
            registroPedido,
            produtosPedido
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = cadastrarPedido