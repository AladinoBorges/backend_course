const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/MoviesModel');

describe('Movie Model Get All: busca todos os filmes', () => {
  let connectionMock;
  const DBServer = new MongoMemoryServer();
  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  before(async () => {
    const URLMock = await DBServer.getUri();
    connectionMock = await MongoClient.connect(URLMock, OPTIONS).then((conn) =>
      conn.db('model_example'),
    );

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quando não existem filmes no banco de dados', () => {
    it('retorna uma array', async () => {
      const result = await MoviesModel.getAll();

      expect(result).to.be.a('array');
    });

    it('a array está vazia', async () => {
      const result = MoviesModel.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('quando existem filmes cadastrados', () => {
    const expectedMovie = {
      id: '604cb554311d68f491ba5781',
      title: 'Example Movie',
      directedBy: 'Jane Model Get All',
      releaseYear: 1999,
    };

    before(async () => {
      await connectionMock.collection('movies').insertOne({ ...expectedMovie });
    });

    after(async () => {
      await connectionMock.collection('movies').drop();
    });

    it('retorna uma array', async () => {
      const result = await MoviesModel.getAll();

      expect(result).to.be.an('array');
    });

    it('a array não está vazia', async () => {
      const result = await MoviesModel.getAll();

      expect(result).to.be.not.empty;
    });

    it('a array possui dados do tipo objecto', async () => {
      const [item] = await MoviesModel.getAll();

      expect(item).to.be.an('object');
    });

    it('tais itens possuem os atributos "id", "title", "directedBy" e "releaseYear"', async () => {
      const [item] = await MoviesModel.getAll();

      expect(item).to.include.all.keys(['id', 'title', 'directedBy', 'releaseYear']);
    });

    it('o filme cadastrado está na lista', async () => {
      const [{ id, title, directedBy, releaseYear }] = await MoviesModel.getAll();

      expect({ id, title, directedBy, releaseYear }).to.deep.equal(expectedMovie);
    });
  });
});
