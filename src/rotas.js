const express = require("express");

const validarCorpoRequisicao = require("./intermediarios/validarCorpoDaRequisicao");
const schemaUsuario = require("./validacoes/schemaUsuario");
const schemaLogin = require("./validacoes/schemaLogin");
const autenticacaoUsuario = require("./intermediarios/autenticacao");
const schemaCliente = require("./validacoes/schemaCliente");
const login = require("./controladores/usuarios/login");
const cadastroUsuario = require("./controladores/usuarios/cadastroUsuario");
const listarCategorias = require("./controladores/categorias/listarCategorias");
const usuarioLogado = require("./controladores/usuarios/usuarioLogado");
const atualizarDadosUsuario = require("./controladores/usuarios/atualizarDadosUsuario");
const cadastrarCliente = require("./controladores/clientes/cadastrarCliente");
const atualizarCliente = require("./controladores/clientes/atualizarCliente");
const listarProdutos = require("./controladores/produtos/listarProdutos");
const detalharProduto = require("./controladores/produtos/detalharProdutos");
const deletarProduto = require("./controladores/produtos/deletarProduto");
const listarCliente = require("./controladores/clientes/listarClientes");
const detalharCliente = require("./controladores/clientes/detalharCliente");
const schemaProduto = require("./validacoes/schemaProduto");
const cadastrarProduto = require("./controladores/produtos/cadastrarProduto");
const atualizarProduto = require("./controladores/produtos/atualizarProduto");
const validarNumeros = require("./intermediarios/validarNumeros");
const cadastrarPedido = require("./controladores/pedidos/cadastroPedido");
const schemaPedido = require("./validacoes/schemaPedido");
const listarPedidos = require("./controladores/pedidos/listarPedidos");
const multer = require("./multer");
const cadastrarCategoria = require("./controladores/categorias/cadastrarCategorias");
const atualizarCategoria = require("./controladores/categorias/atualizarCategorias");
const schemaCategoria = require("./validacoes/schemaCategoria");
const rotas = express();

rotas.get("/categoria", listarCategorias);
rotas.post("/login", validarCorpoRequisicao(schemaLogin), login);
rotas.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastroUsuario);

rotas.use(autenticacaoUsuario);
rotas.use(validarNumeros)

rotas.post("/categoria", validarCorpoRequisicao(schemaCategoria), cadastrarCategoria)
rotas.put("/categoria/:id", validarCorpoRequisicao(schemaCategoria), atualizarCategoria)

rotas.get("/usuario", usuarioLogado);
rotas.put(
    "/usuario",
    validarCorpoRequisicao(schemaUsuario),
    atualizarDadosUsuario
);
rotas.post("/cliente", validarCorpoRequisicao(schemaCliente), cadastrarCliente);
rotas.put(
    "/cliente/:id",
    validarCorpoRequisicao(schemaCliente),
    atualizarCliente
);
rotas.get("/cliente", listarCliente);
rotas.get("/cliente/:id", detalharCliente);

rotas.get("/produto", listarProdutos);
rotas.get("/produto/:id", detalharProduto);
rotas.post("/produto", multer.single('arquivo'), validarCorpoRequisicao(schemaProduto), cadastrarProduto)
rotas.put("/produto/:id", multer.single('arquivo'), validarCorpoRequisicao(schemaProduto), atualizarProduto)
rotas.delete("/produto/:id", deletarProduto);

rotas.post("/pedido", validarCorpoRequisicao(schemaPedido), cadastrarPedido)
rotas.get("/pedido", listarPedidos)

module.exports = rotas;
