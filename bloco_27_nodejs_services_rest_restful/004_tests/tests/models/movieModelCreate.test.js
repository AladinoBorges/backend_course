const sinon = require('sinon');
const { expect } = require('chai');

// ? REQUISITOS DO MODEL:
// todo 1) a API deve permitir a inserção de filmes no banco de dados:
// * a camada deve receber e registrar as seguintes informações do filme: 'nome', 'direcção', 'ano de lançamento';
// * ao realizar a inserção de um novo filme, o endpoint deve retornar o ID do filme acabado de criar.

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/MoviesModel');

describe('Insere um novo filme no banco de dados.', () => {
  let connectionMock;

  const payloadMovie = {
    title: 'Example Movie',
    directedBy: 'jane Dow',
    releaseYear: 1999,
  };

  before(() => {
    const ID_EXAMPLE = '604cb554311d68f491ba5781';
    const insertOne = async () => ({ insertedId: ID_EXAMPLE });
    const collection = async () => ({ insertOne });
    const db = async (databaseName) => ({ collection });
    const getConnectionMock = async () => ({ db });

    connectionMock = getConnectionMock().then((conn) => conn.db('model_example'));

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
  });
});

// NAME=movieModelCreate npm test
