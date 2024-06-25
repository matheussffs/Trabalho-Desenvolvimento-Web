// controllers/indexController.js
const db = require('../database');

exports.getFilmesPorCategoria = (req, res) => {
  const query = `
    SELECT filme.id, filme.titulo, filme.imagem, categoria.nome AS categoria_nome 
    FROM filme 
    JOIN categoria ON filme.id_categoria = categoria.id
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro ao buscar filmes');
    }
    
    const filmesPorCategoria = {};

    results.forEach(row => {
      if (!filmesPorCategoria[row.categoria_nome]) {
        filmesPorCategoria[row.categoria_nome] = [];
      }
      filmesPorCategoria[row.categoria_nome].push(row);
    });

    res.render('index', { filmesPorCategoria });
  });
};
