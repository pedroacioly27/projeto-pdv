const validarNumeros = async (req, res, next) => {
    const { numero, cep, cpf } = req.body
    if (numero) {
        if (numero < 0) {
            return res.status(400).json({ mensagem: 'número com formato incorreto!' })
        }
    }
    if (cep) {
        if (cep < 0) {
            return res.status(400).json({ mensagem: 'cep com formato incorreto!' })
        }
    }
    if (cpf) {
        if (cpf < 0) {
            return res.status(400).json({ mensagem: 'cpf com formato incorreto!' })
        }
    }

    next()
}

module.exports = validarNumeros