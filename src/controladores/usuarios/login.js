const knex = require('../../conexao');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { email, senha } = req.body
    try {
        const usuario = await knex('usuarios').where({ email }).first()

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' })
        }

        const senhaValidada = await bcrypt.compare(senha, usuario.senha)
        if (!senhaValidada) {
            return res.status(400).json({ mensagem: 'Email ou senha inválido' })
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_PASS, { expiresIn: '8h' })

        const usuarioLogado = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        return res.status(200).json({
            usuario: usuarioLogado,
            token
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = login
