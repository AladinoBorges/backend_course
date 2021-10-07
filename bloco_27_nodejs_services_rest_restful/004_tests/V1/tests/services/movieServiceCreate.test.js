const sinon = require('sinon');
const { expect } = require('chai');

const MoviesService = require('../../services/moviesServices');

describe('Movies Service Create: insere um novo filme no banco de dados', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadMovie = {};

    it('retorna um valor boleano', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.be.a('boolean');
    });

    it('o valor boleano é igual a "falso"', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payloadMovie = {
      title: 'Example Movie',
      directedBy: 'Jane Service Create',
      releaseYear: 1999,
    };

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(MoviesService, 'create').resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      MoviesService.create.restore();
    });

    it('retorna um objecto', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await MoviesService.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });
  });
});