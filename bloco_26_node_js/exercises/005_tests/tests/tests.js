const { expect } = require('chai');

const numberValidator = require('../services/numberValidator');

const messages = {
  callWithoutParams: 'Loading ...\nNumber validator initialized successfully.',
  isInvalidType: 'the inserted value must be a "number".',
  isValidReturn: 'string',
  positiveNumber: 'positive number',
  negativeNumber: 'negative number',
  neutralNumber: 'neutral number',
};

describe('NumberValidator', () => {
  describe('Quando a função no arquivo existe', () => {
    describe('A resposta da chamada da função sem parâmetros', () => {
      it('é uma string', () => {
        const response = numberValidator();

        expect(response).to.be.a(messages.isValidReturn);
      });

      it('é igual à frase', () => {
        const response = numberValidator();

        expect(response).to.be.equals(messages.callWithoutParams);
      });
    });

    describe('A resposta da chamada da função com parâmetros', () => {
      it('um valor do tipo string ("1") retornará um erro', () => {
        const response = numberValidator('1');

        expect(response).to.be.equals(messages.isInvalidType);
      });

      it('um valor do tipo number (10) e maior que zero retorna uma mensagem', () => {
        const response = numberValidator(10);

        expect(response).to.be.equals(messages.positiveNumber);
      });

      it('um valor do tipo number(-60) e menor que zero retorna uma mensagem', () => {
        const response = numberValidator(-60);

        expect(response).to.be.equals(messages.negativeNumber);
      });

      it('um valor do tipo number (0) e igual a zero', () => {
        const response = numberValidator(0);

        expect(response).to.be.equals(messages.neutralNumber);
      });
    });
  });
});
