const knex = require('../../conexao');
const bcrypt = require('bcrypt')

const cadastroUsuario = async (req, res) => {
    const { nome, email, senha } = req.body
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const verificarEmail = await knex('usuarios').where({ email }).first()

        if (verificarEmail) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' })
        }

        const cadastro = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning(['id', 'nome', 'email'])


        return res.status(201).json(cadastro)

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }

}

module.exports = cadastroUsuario