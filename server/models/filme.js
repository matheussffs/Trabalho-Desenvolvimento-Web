// models/filme.js
class Filme {
  static add(db, filmeData, callback) {
      const query = 'INSERT INTO filme (titulo, descricao, ano_lancamento, id_categoria, imagem) VALUES (?, ?, ?, ?, ?)';
      const values = [filmeData.titulo, filmeData.descricao, filmeData.ano_lancamento, filmeData.id_categoria, filmeData.imagem];
      db.query(query, values, callback);
  }

  static getAll(db, callback) {
      const query = 'SELECT * FROM filme';
      db.query(query, callback);
  }

  static getById(db, filmeId, callback) {
      const query = 'SELECT * FROM filme WHERE id = ?';
      db.query(query, [filmeId], callback);
  }

  static update(db, filmeId, filmeData, callback) {
      const query = 'UPDATE filme SET titulo = ?, descricao = ?, ano_lancamento = ?, id_categoria = ?, imagem = ? WHERE id = ?';
      const values = [filmeData.titulo, filmeData.descricao, filmeData.ano_lancamento, filmeData.id_categoria, filmeData.imagem, filmeId];
      db.query(query, values, callback);
  }

  static delete(db, filmeId, callback) {
      const query = 'DELETE FROM filme WHERE id = ?';
      db.query(query, [filmeId], callback);
  }
}

module.exports = Filme;
