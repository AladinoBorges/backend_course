const fs = require('fs');
const sinon = require('sinon');
const { expect } = require('chai');

const numberValidator = require('../services/numberValidator');
const filesWriter = require('../services/filesWriter');

const messages = {
  general: {
    isValidReturn: 'string',
  },
  numbers: {
    callWithoutParams: 'Loading ... Number validator initialized successfully',
    isInvalidType: 'the inserted value must be a "number".',
    positiveNumber: 'positive number',
    negativeNumber: 'negative number',
    neutralNumber: 'neutral number',
  },
  writer: {
    success: 'ok',
    invalidFileName: 'file not found',
    invalidParameterNumber: 'invalid parameter number',
  },
};

describe('Cases: numbers validators', () => {
  const { general, numbers } = messages;

  describe('Quando a função no arquivo existe', () => {
    describe('A resposta da chamada da função sem parâmetros', () => {
      const response = numberValidator();

      it('é uma string', () => {
        expect(response).to.be.a(general.isValidReturn);
      });

      it(`é igual à frase "${numbers.callWithoutParams}"`, () => {
        expect(response).to.be.equal(numbers.callWithoutParams);
      });
    });

    describe('A resposta da chamada da função', () => {
      describe('com um valor do tipo string ("1") como parâmetro', () => {
        const response = numberValidator('1');

        it(`retorna uma mensagem "${numbers.isInvalidType}"`, () => {
          expect(response).to.be.equal(numbers.isInvalidType);
        });
      });

      describe('com um valor do tipo number, maior que zero como parâmetro', () => {
        const response = numberValidator(10);

        it(`retorna uma mensagem "${numbers.positiveNumber}"`, () => {
          expect(response).to.be.equal(numbers.positiveNumber);
        });
      });

      describe('com um valor do tipo number, menor que zero como parâmetro', () => {
        const response = numberValidator(-60);

        it(`retorna uma mensagem "${numbers.negativeNumber}"`, () => {
          expect(response).to.be.equal(numbers.negativeNumber);
        });
      });

      describe('com um valor do tipo number, menor que zero como parâmetro', () => {
        const response = numberValidator(0);

        it(`retorna uma mensagem "${numbers.neutralNumber}"`, () => {
          expect(response).to.be.equal(numbers.neutralNumber);
        });
      });
    });
  });
});

describe('Cases: files writer', () => {
  const VALID_FILE_NAME = 'texts_from_aladino.txt';
  const INVALID_FILE_NAME = 'inexistent_file.txt';
  const CONTENT =
    'eu sou o ar,\na amplitude modulada pela frequência,\nquando tudo o que resta,\na impermanência,\nme leva aos que restam,\nàs arestas consignadas ao mar,\ne pêndulos comuns às intersecções das faces despidas de suas coroas,\nsem ciência,\nlonge de casa,\nalém mar,\nno além,\no mar.\n';

  const { general, writer } = messages;

  describe('Quando o arquivo existe', () => {
    before(() => {
      sinon.stub(fs, 'writeFileSync');
    });

    after(() => {
      fs.writeFileSync.restore();
    });

    describe('a resposta quando é passado apenas um parâmetro à função', () => {
      it(`é igual a "${writer.invalidParameterNumber}"`, () => {
        const response = filesWriter(VALID_FILE_NAME);

        expect(response).to.be.equal(writer.invalidParameterNumber);
      });
    });

    describe('a resposta quando são passados todos os parâmetros à função', () => {
      const response = filesWriter(VALID_FILE_NAME, CONTENT);

      it(`é uma "${general.isValidReturn}"`, () => {
        expect(response).to.be.a(general.isValidReturn);
      });

      it(`é igual a "${writer.success}"`, () => {
        expect(response).to.be.equal(writer.success);
      });
    });
  });

  describe('Quando o arquivo não existe', () => {
    before(() => {
      sinon.stub(fs, 'writeFileSync').throws(new Error(writer.invalidFileName));
    });

    after(() => {
      fs.writeFileSync.restore();
    });

    describe('a resposta', () => {
      it(`é igual a "${writer.invalidFileName}""`, () => {
        const response = filesWriter(INVALID_FILE_NAME, CONTENT);

        expect(response).to.be.equal(writer.invalidFileName);
      });
    });
  });
});
