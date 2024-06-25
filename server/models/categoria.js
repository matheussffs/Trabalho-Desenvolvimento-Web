class Categoria {
    static add(db, categoriaData, callback) {
      const query = 'INSERT INTO categoria (nome) VALUES (?)';
      db.query(query, [categoriaData.nome], callback);
    }
  
    static getAll(db, callback) {
      const query = 'SELECT * FROM categoria';
      db.query(query, callback);
    }
  
    static getById(db, categoriaId, callback) {
      const query = 'SELECT * FROM categoria WHERE id = ?';
      db.query(query, [categoriaId], callback);
    }
  
    static update(db, categoriaId, categoriaData, callback) {
      const query = 'UPDATE categoria SET nome = ? WHERE id = ?';
      db.query(query, [categoriaData.nome, categoriaId], callback);
    }
  
    static delete(db, categoriaId, callback) {
      const query = 'DELETE FROM categoria WHERE id = ?';
      db.query(query, [categoriaId], callback);
    }
  }
  
  module.exports = Categoria;
  