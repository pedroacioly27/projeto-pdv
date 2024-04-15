const joi = require("joi");

const schemaPedido = joi.object({

    cliente_id: joi.number().required().messages({
        "any.required": "O campo cliente_id é obrigatório!",
        "number.base": "cliente_id Formato incorreto"
    }),
    pedido_produtos: joi.array().required().min(1).items(joi.object({
        produto_id: joi.number().required().messages({
            "any.required": "O campo produto_id é obrigatório!",
            "number.base": "produto_id Formato incorreto"
        }),
        quantidade_produto: joi.number().required().integer().positive().messages({
            "any.required": "O campo quantidade_produto é obrigatório!",
            "number.base": "quantidade_produto Formato incorreto",
            "number.positive": "quantidade_produto Formato incorreto",
            "number.integer": "quantidade_produto Formato incorreto"
        })
    })).messages({
        "any.required": "O campo pedido_produtos é obrigatório!",
        "array.base": "pedido_produtos Formato incorreto",
        "array.min": "O pedido deve conter ao menos 1 produto"
    }),
    observacao: joi.string().messages({
        "string.base": "Formato incorreto"
    })
});

module.exports = schemaPedido;