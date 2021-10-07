const sinon = require('sinon');
const { expect } = require('chai');

const MoviesModel = require('../../models/MoviesModel');
const MoviesService = require('../../services/MoviesServices');

describe('Movie Service Get All: busca todos os filmes do banco de dados', () => {
  describe('quando não existem filmes', () => {
    before(() => {
      sinon.stub(MoviesModel, 'getAll').resolves([]);
    });

    after(() => {
      MoviesModel.getAll.restore();
    });

    it('retorna uma array', async () => {
      const result = await MoviesService.getAll();

      expect(result).to.be.an('array');
    });

    it('a array está vazia', async () => {
      const result = await MoviesService.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('quando existem filmes criados', () => {
    before(() => {
      sinon.stub(MoviesModel, 'getAll').resolves([
        {
          id: '604cb554311d68f491ba5781',
          title: 'Example Movie',
          directedBy: 'Jane Service Get All',
          releaseYear: 1999,
        },
      ]);
    });

    after(() => {
      MoviesModel.getAll.restore();
    });

    it('retorna uma array', async () => {
      const result = await MoviesService.getAll();

      expect(result).to.be.an('array');
    });

    it('a array não está vazia', async () => {
      const result = await MoviesService.getAll();

      expect(result).be.be.not.empty;
    });

    it('a array posso items do tipo objecto', async () => {
      const [item] = await MoviesService.getAll();

      expect(item).to.be.an('object');
    });

    it('tais items possuem as propriedades "id", "title", "directedBy" e "releaseYear"', async () => {
      const [item] = await MoviesService.getAll();

      expect(item).to.include.all.keys('id', 'title', 'directedBy', 'releaseYear');
    });
  });
});
