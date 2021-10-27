const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoConnection = require('../../connections/connectionMongo');
const MovieModel = require('../../models/MovieModel');

describe('MOVIES MODEL CREATE: Insere um novo filme no BD', () => {
  let connectionMock;

  const payloadMovie = {
    title: 'Example Movie Model Create',
    directedBy: 'Jane Dow',
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

  describe('quando é inserido com sucesso', () => {
    it('retorna um objeto', async () => {
      const response = await MovieModel.create(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await MovieModel.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });

    it('deve existir um filme com o título cadastrado', async () => {
      await MovieModel.create(payloadMovie);

      const movieCreated = await connectionMock
        .collection('movies')
        .findOne({ title: payloadMovie.title });

      expect(movieCreated).to.be.not.null;
    });
  });
});
