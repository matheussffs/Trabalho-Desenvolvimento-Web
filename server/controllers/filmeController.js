// controllers/filmeController.js
const db = require('../database');
const Filme = require('../models/filme');
const Categoria = require('../models/categoria');

// Função para adicionar ou atualizar um filme
exports.addOrUpdateFilme = (req, res) => {
    const filmeData = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        ano_lancamento: req.body.ano_lancamento,
        id_categoria: req.body.id_categoria,
        imagem: req.file ? req.file.buffer : null
    };

    if (req.params.id) {
        // Atualizar filme
        Filme.update(db, req.params.id, filmeData, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating filme');
            }
            res.redirect('/filmes/add');
        });
    } else {
        // Adicionar novo filme
        Filme.add(db, filmeData, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error adding filme');
            }
            res.redirect('/filmes/add');
        });
    }
};

// Função para obter todos os filmes e categorias
exports.getFilmes = (req, res) => {
    Filme.getAll(db, (err, filmes) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching filmes');
        }
        Categoria.getAll(db, (err, categorias) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error fetching categorias');
            }
            res.render('addFilme', {
                title: 'Cadastro de Filme',
                filmes,
                categorias,
                filme: null // Certifique-se de que 'filme' está definido
            });
        });
    });
};

// Função para obter um filme por ID para edição
exports.getEditFilmeForm = (req, res) => {
    const filmeId = req.params.id;
    Filme.getById(db, filmeId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching filme data');
        }
        const filme = result[0];
        Filme.getAll(db, (err, filmes) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error fetching filmes');
            }
            Categoria.getAll(db, (err, categorias) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error fetching categorias');
                }
                res.render('addFilme', {
                    title: 'Cadastro de Filme',
                    filmes,
                    categorias,
                    filme
                });
            });
        });
    });
};

// Função para deletar um filme
exports.deleteFilme = (req, res) => {
    const filmeId = req.params.id;
    Filme.delete(db, filmeId, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting filme');
        }
        res.redirect('/filmes/add');
    });
};

// Função para exibir detalhes do filme
exports.getFilmeDetalhes = (req, res) => {
    const filmeId = req.params.id;
    Filme.getById(db, filmeId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error fetching filme data');
        }
        if (result.length === 0) {
            return res.status(404).send('Filme não encontrado');
        }
        const filme = result[0];
        Categoria.getById(db, filme.id_categoria, (err, categoriaResult) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error fetching categoria data');
            }
            const nome_categoria = categoriaResult[0] ? categoriaResult[0].nome : 'Categoria não encontrada';
            filme.nome_categoria = nome_categoria;
            res.render('detalhesFilme', {
                title: filme.titulo,
                filme
            });
        });
    });
};

// Função para pesquisar filmes por nome
exports.searchFilmes = (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) {
        return res.redirect('/filmes/add'); // Redireciona para a página de filmes se não houver termo de pesquisa
    }
    Filme.searchByName(db, searchTerm, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar filmes');
        }
        res.render('searchResults', {
            title: 'Resultados da Pesquisa',
            filmes: result
        });
    });
};

