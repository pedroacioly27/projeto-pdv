const joi = require("joi");

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        "any.required": "O campo descricao é obrigatório!",
        "string.empty": "O campo descricao é obrigatório!",
        "string.base": "Formato incorreto"
    }),
    quantidade_estoque: joi.number().required().integer().positive().messages({
        "any.required": "O campo quantidade_estoque é obrigatório!",
        "number.base": "quantidade_estoque Formato incorreto",
        "number.positive": "quantidade_estoque Formato incorreto",
        "number.integer": "quantidade_estoque Formato incorreto"
    }),
    valor: joi.number().required().integer().positive().messages({
        "any.required": "O campo valor é obrigatório!",
        "number.base": "valor Formato incorreto",
        "number.positive": "valor Formato incorreto",
        "number.integer": "valor Formato incorreto"
    }),
    categoria_id: joi.number().required().integer().positive().messages({
        "any.required": "O campo categoria_id é obrigatório!",
        "number.base": "categoria_id Formato incorreto",
        "number.positive": "categoria_id Formato incorreto",
        "number.integer": "categoria_id Formato incorreto"
    })
});

module.exports = schemaProduto;