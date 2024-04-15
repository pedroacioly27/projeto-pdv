const joi = require("joi");

const schemaCategoria = joi.object({
  descricao: joi.string().required().messages({
    "any.required": "O campo descricao é obrigatório!",
    "string.empty": "O campo descricao é obrigatório!",
    "string.base": "O campo descricao deve ser uma string"
  })
});

module.exports = schemaCategoria;