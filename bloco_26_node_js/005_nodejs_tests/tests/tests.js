const fs = require('fs');
const sinon = require('sinon');
const { expect } = require('chai');

const filesReader = require('../services/filesReader');

const CONTEUDO_DO_ARQUIVO = 'Finalmente comecei a estudar sobre testes com Node.js';

describe('filesReader', () => {
  describe('Quando o arquivo existe', () => {
    before(() => {
      sinon.stub(fs, 'readFileSync').returns(CONTEUDO_DO_ARQUIVO);
    });

    after(() => {
      fs.readFileSync.restore();
    });

    describe('a resposta', () => {
      it('é uma string', () => {
        const response = filesReader('aladino_message.txt');

        expect(response).to.be.a('string');
      });

      it('é igual ao conteúdo do arquivo', () => {
        const response = filesReader('aladino_message.txt');

        expect(response).to.be.equals(CONTEUDO_DO_ARQUIVO);
      });
    });
  });

  describe('Quando o arquivo não existe', () => {
    before(() => {
      sinon.stub(fs, 'readFileSync').throws(new Error('Arquivo não encontrado'));
    });

    after(() => {
      fs.readFileSync.restore();
    });

    describe('a resposta', () => {
      it('é igual a "null"', () => {
        const response = filesReader('inexistent_file.txt');

        expect(response).to.be.equal(null);
      });
    });
  });
});
