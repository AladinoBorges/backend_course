const sinon = require('sinon');
const { expect } = require('chai');

const MoviesController = require('../../controllers/MoviesController');
const MoviesService = require('../../services/MoviesServices');

describe('Movies Controller Create: ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MoviesService, 'create').resolves(false);
    });

    after(() => {
      MoviesService.create.restore();
    });

    it('é chamado o status com o código 400', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await MoviesController.create(request, response);

      expect(response.json.calledWith({ message: 'Dados inválidos' })).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {
        title: 'Example Movie',
        directedBy: 'Jane Controller Create',
        releaseYear: 1999,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MoviesService, 'create').resolves(true);
    });

    after(() => {
      MoviesService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Filme criado com sucesso!"', async () => {
      expect(response.json.calledWith({ message: 'Filme criado com sucesso!' })).to.be.equal(true);
    });
  });
});
