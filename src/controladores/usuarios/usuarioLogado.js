
const usuarioLogado = async (req, res) => {
    return res.status(200).json({
        id: req.usuario.id,
        nome: req.usuario.nome,
        email: req.usuario.email,
    })
}

module.exports = usuarioLogado