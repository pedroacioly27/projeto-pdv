const joi = require("joi");

const schemaCliente = joi.object({
  nome: joi.string().required().messages({
    "any.required": "O campo nome é obrigatório!",
    "string.empty": "O campo nome é obrigatório!",
    "string.base": "O campo nome deve ser uma string"
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório!",
    "string.empty": "O campo email é obrigatório!",
    "string.email": "O email precisa ter um formato válido",
    "string.base": "O campo email deve ser uma string"
  }),
  cpf: joi.string().required().min(11).max(11).messages({
    "any.required": "O campo cpf é obrigatório!",
    "string.empty": "O campo cpf é obrigatório!",
    "string.min": "O cpf precisa conter no mínimo 11 caracteres",
    "string.max": "O cpf precisa conter no maximo 11 caracteres",
    "string.base": "O campo cpf deve ser uma string"
  }),
  cep: joi.string().min(8).max(8).messages({
    "string.min": "O cep precisa conter no mínimo 8 caracteres",
    "string.max": "O cep precisa conter no maximo 8 caracteres",
    "string.base": "O campo cep deve ser uma string"

  }),
  numero: joi.string().max(13).messages({
    "string.max": "O numero pode conter no maximo 13 caracteres",
    "string.base": "O campo numero deve ser uma string"
  }),
  rua: joi.string().max(50).messages({
    "string.max": "Quantidade maxima de caracteres para o compo rua",
    "string.base": "O campo rua deve ser uma string",
  }),
  bairro: joi.string().max(50).messages({
    "string.max": "Quantidade maxima de caracteres para o compo bairro",
    "string.base": "O campo bairro deve ser uma string",
  }),
  cidade: joi.string().max(50).messages({
    "string.max": "Quantidade maxima de caracteres para o compo cidade",
    "string.base": "O campo cidade deve ser uma string",
  }),
  estado: joi.string().max(2).messages({
    "string.max": "Quantidade maxima de caracteres para o compo estado é 2",
    "string.base": "O campo estado deve ser uma string",
  }),
});

module.exports = schemaCliente;