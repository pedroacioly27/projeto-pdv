const knex = require("../../conexao");
const bcrypt = require("bcrypt");

const atualizarDadosUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  const { id } = req.usuario;
  try {
    const usuario = await knex("usuarios").where({ id }).first();
    const validarEmail = await knex("usuarios").where({ email }).first();

    if (validarEmail) {
      if (usuario.email !== validarEmail.email) {
        return res.status(400).json({ mensagem: "Email já cadastrado" });
      }
    }
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const usuarioAtualizado = await knex("usuarios")
      .where({ id })
      .update({ nome, email, senha: senhaCriptografada })
      .returning(["id", "nome", "email"]);
    return res
      .status(200)
      .json({
        mensagem: "Usuário Atualizado com sucesso",
        usuario: usuarioAtualizado[0],
      });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = atualizarDadosUsuario