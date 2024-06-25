const Filme = require('../server/models/filme');

describe('Filme Model', () => {
  it('should create a new filme with given data', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, { insertId: 1 })
    };

    const filmeData = {
      titulo: 'Inception',
      descricao: 'A mind-bending thriller',
      ano_lancamento: 2010,
      id_categoria: 1,
      imagem: Buffer.from('image data')
    };

    Filme.add(dbMock, filmeData, (err, result) => {
      expect(err).toBeNull();
      expect(result.insertId).toBe(1);
      done();
    });
  });

  it('should retrieve all filmes', done => {
    const dbMock = {
      query: (query, callback) => callback(null, [{ id: 1, titulo: 'Inception' }])
    };

    Filme.getAll(dbMock, (err, filmes) => {
      expect(err).toBeNull();
      expect(filmes).toBeInstanceOf(Array);
      expect(filmes[0].titulo).toBe('Inception');
      done();
    });
  });

  it('should retrieve filme by ID', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, [{ id: 1, titulo: 'Inception' }])
    };

    Filme.getById(dbMock, 1, (err, filme) => {
      expect(err).toBeNull();
      expect(filme[0].titulo).toBe('Inception');
      done();
    });
  });

  it('should update a filme', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, { affectedRows: 1 })
    };

    const filmeData = {
      titulo: 'Interstellar',
      descricao: 'A journey through space and time',
      ano_lancamento: 2014,
      id_categoria: 1,
      imagem: Buffer.from('image data')
    };

    Filme.update(dbMock, 1, filmeData, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });

  it('should delete a filme', done => {
    const dbMock = {
      query: (query, values, callback) => callback(null, { affectedRows: 1 })
    };

    Filme.delete(dbMock, 1, (err, result) => {
      expect(err).toBeNull();
      expect(result.affectedRows).toBe(1);
      done();
    });
  });
});
