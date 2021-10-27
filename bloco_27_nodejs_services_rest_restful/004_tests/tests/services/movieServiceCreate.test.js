const sinon = require('sinon');
const { expect } = require('chai');

const MovieService = require('../../services/MovieService');
const MovieModel = require('../../models/MovieModel');

describe('MOVIE SERVICE CREATE: Insere um novo filme no BD', () => {
  describe('quando o payload informado não é válido', () => {
    const payloadMovie = {};

    it('retorna um boolean', async () => {
      const response = await MovieService.create(payloadMovie);

      expect(response).to.be.a('boolean');
    });

    it('o boolean contém "fasle"', async () => {
      const response = await MovieService.create(payloadMovie);

      expect(response).to.be.equal(false);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const payloadMovie = {
      title: 'Example Movie Service Create',
      directedBy: 'Jane Dow',
      releaseYear: 1999,
    };

    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(MovieModel, 'create').resolves({ id: ID_EXAMPLE });
    });

    after(() => {
      MovieModel.create.restore();
    });

    it('retorna um objecto', async () => {
      const response = await MovieService.create(payloadMovie);

      expect(response).to.be.a('object');
    });

    it('tal objecto possui o "id" do novo filme inserido', async () => {
      const response = await MovieService.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });
  });
});
