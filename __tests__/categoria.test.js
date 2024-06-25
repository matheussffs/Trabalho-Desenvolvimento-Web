const Categoria = require('../server/models/categoria');

describe('Categoria Model', () => {
  it('should create a new category with given name', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, { insertId: 1 })
    };

    Categoria.add(dbMock, { nome: 'Action' }, (err, result) => {
      expect(err).toBeNull();
      expect(result.insertId).toBe(1);
      done();
    });
  });

  it('should retrieve all categories', done => {
    const dbMock = {
      query: (query, callback) => callback(null, [{ id: 1, nome: 'Action' }])
    };

    Categoria.getAll(dbMock, (err, categories) => {
      expect(err).toBeNull();
      expect(categories).toBeInstanceOf(Array);
      expect(categories[0].nome).toBe('Action');
      done();
    });
  });

  it('should retrieve category by ID', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, [{ id: 1, nome: 'Action' }])
    };

    Categoria.getById(dbMock, 1, (err, category) => {
      expect(err).toBeNull();
      expect(category[0].nome).toBe('Action');
      done();
    });
  });

  it('should update a category', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, { affectedRows: 1 })
    };

    Categoria.update(dbMock, 1, { nome: 'Adventure' }, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });

  it('should delete a category', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, { affectedRows: 1 })
    };

    Categoria.delete(dbMock, 1, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });
});
