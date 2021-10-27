const sinon = require('sinon');
const { expect } = require('chai');

const MovieService = require('../../services/MovieService');
const MovieController = require('../../controllers/MovieController');

describe('MOVIE CONTROLLER CREATE: Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MovieService, 'create').resolves(false);
    });

    after(() => {
      MovieService.create.restore();
    });

    it('é chamado o status com o código 400 ', async () => {
      await MovieController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Dados inválidos"', async () => {
      await MovieController.create(request, response);

      expect(response.json.calledWith({ message: 'Dados inválidos' })).to.be.equal(true);
    });
  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        title: 'Example Movie Controller Create',
        directedBy: 'Jane Dow',
        releaseYear: 1999,
      };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MovieService, 'create').resolves(true);
    });

    after(() => {
      MovieService.create.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await MovieController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o json com a mensagem "Filme criado com sucesso!"', async () => {
      await MovieController.create(request, response);

      expect(response.json.calledWith({ message: 'Filme criado com sucesso!' })).to.be.equal(true);
    });
  });
});
