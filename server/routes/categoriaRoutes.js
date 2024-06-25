// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Rota para renderizar o formulário e listar categorias
router.get('/add', categoriaController.getCategorias);

// Rota para adicionar ou atualizar uma categoria
router.post('/add', categoriaController.addOrUpdateCategoria);
router.post('/edit/:id', categoriaController.addOrUpdateCategoria);

// Rota para deletar uma categoria
router.post('/delete/:id', categoriaController.deleteCategoria);

// Rota para obter uma categoria por ID para edição
router.get('/edit/:id', categoriaController.getEditCategoriaForm);

module.exports = router;
