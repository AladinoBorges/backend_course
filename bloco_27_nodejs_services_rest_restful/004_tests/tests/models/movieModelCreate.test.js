const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

// ? REQUISITOS DO MODEL:
// todo 1) a API deve permitir a inserção de filmes no banco de dados:
// * a camada deve receber e registrar as seguintes informações do filme: 'nome', 'direcção', 'ano de lançamento';
// * ao realizar a inserção de um novo filme, o endpoint deve retornar o ID do filme acabado de criar.

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/MoviesModel');

describe('Movies Model Create: Insere um novo filme no banco de dados.', () => {
  let connectionMock;

  const payloadMovie = {
    title: 'Example Movie',
    directedBy: 'jane Dow',
    releaseYear: 1999,
  };

  const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  before(async () => {
    const DBServer = new MongoMemoryServer();
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, OPTIONS).then((conn) =>
      conn.db('model_example'),
    );

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(() => {
    mongoConnection.getConnection.restore();
  });

  describe('quando é inserido com sucesso:', () => {
    it('retorna um objecto', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objecto possui um "id" do novo filme inserido', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });

    it('deve existir um filme com o título cadastrado', async () => {
      await MoviesModel.create(payloadMovie);

      const movieCreated = await connectionMock
        .collection('movies')
        .findOne({ title: payloadMovie.title });

      expect(movieCreated).to.be.not.null;
    });
  });
});
