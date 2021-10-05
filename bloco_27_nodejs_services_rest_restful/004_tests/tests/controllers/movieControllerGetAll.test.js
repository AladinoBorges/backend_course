const sinon = require('sinon');
const { expect } = require('chai');

const MoviesController = require('../../controllers/MoviesController');
const MoviesServices = require('../../services/MoviesServices');
const { request, response } = require('express');

describe('Movie Controller Get All: ao chamar o controller getAll', () => {
  describe('quando não existem filmes no banco de dados', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MoviesServices, 'getAll').resolves([]);
    });

    after(() => {
      MoviesServices.getAll.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await MoviesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" com uma array', async () => {
      await MoviesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o método "json" com uma array vazia', async () => {
      await MoviesController.getAll(request, response);

      expect(response.json.calledWith([])).to.be.equal(true);
    });
  });

  describe('quando existem filmes no banco de dados', () => {
    const request = {};
    const response = {};
    const expectedResult = [
      {
        id: '604cb554311d68f491ba5781',
        title: 'Example Movie',
        directedBy: 'Jane Controller Get All',
        releaseYear: 1999,
      },
    ];

    before(() => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(MoviesServices, 'getAll').resolves(expectedResult);
    });

    after(() => {
      MoviesServices.getAll.restore();
    });

    it('é chamado o método "status" com o código 200', async () => {
      await MoviesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" com uma array', async () => {
      await MoviesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });

    it('é chamado o método "json" com a lista de filmes', async () => {
      await MoviesController.getAll(request, response);

      expect(response.json.calledWith(expectedResult)).to.be.equal(true);
    });
  });
});
