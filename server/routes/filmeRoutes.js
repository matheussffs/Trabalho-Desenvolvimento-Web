// routes/filmeRoutes.js
const express = require('express');
const router = express.Router();
const filmeController = require('../controllers/filmeController');

// Rota para renderizar o formulário e listar filmes
router.get('/add', filmeController.getFilmes);

// Rota para adicionar ou atualizar um filme
router.post('/add', filmeController.addOrUpdateFilme);
router.post('/edit/:id', filmeController.addOrUpdateFilme);

// Rota para deletar um filme
router.post('/delete/:id', filmeController.deleteFilme);

// Rota para obter um filme por ID para edição
router.get('/edit/:id', filmeController.getEditFilmeForm);

// Rota para mostrar os detalhes de um filme
router.get('/show/:id', filmeController.showFilme);

module.exports = router;
