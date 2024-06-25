// controllers/categoriaController.js
const db = require('../database');
const Categoria = require('../models/categoria');

// Função para adicionar ou atualizar uma categoria
exports.addOrUpdateCategoria = (req, res) => {
    const categoriaData = {
        nome: req.body.nome
    };

    if (req.params.id) {
        // Atualizar categoria
        Categoria.update(db, req.params.id, categoriaData, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating categoria');
            }
            res.redirect('/categorias/add');
        });
    } else {
        // Adicionar nova categoria
        Categoria.add(db, categoriaData, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding categoria');
            }
            res.redirect('/categorias/add');
        });
    }
};

// Função para obter todas as categorias
exports.getCategorias = (req, res) => {
    Categoria.getAll(db, (err, categorias) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching categorias');
        }
        res.render('addCategoria', {
            title: 'Cadastro de Categoria',
            categorias,
            categoria: null
        });
    });
};

// Função para obter uma categoria por ID para edição
exports.getEditCategoriaForm = (req, res) => {
    const categoriaId = req.params.id;
    Categoria.getById(db, categoriaId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching categoria data');
        }
        const categoria = result[0];
        Categoria.getAll(db, (err, categorias) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error fetching categorias');
            }
            res.render('addCategoria', {
                title: 'Cadastro de Categoria',
                categorias,
                categoria
            });
        });
    });
};

// Função para deletar uma categoria
exports.deleteCategoria = (req, res) => {
    const categoriaId = req.params.id;
    Categoria.delete(db, categoriaId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting categoria');
        }
        res.redirect('/categorias/add');
    });
};
