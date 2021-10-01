const { expect } = require('chai');

const { calculator } = require('../services/calculator');

describe('Quando passados os valores 10 e 3', () => {
  it('retorna 13 no caso do terceiro parâmetro ser "soma"', () => {
    const response = calculator(10, 3, 'soma');

    expect(response).to.be.equals(13);
  });
});

describe('Quando passados os valores 7 e 3', () => {
  it('retorna 4 no caso do terceiro parâmetro ser "MENOS"', () => {
    const response = calculator(7, 3, 'MENOS');

    expect(response).to.be.equals(4);
  });
});

describe('Quando passados os valores 15 e 3', () => {
  it('retorna 45 no caso do terceiro parâmetro ser "multiply"', () => {
    const response = calculator(15, 3, '*');

    expect(response).to.be.equals(45);
  });
});

describe('Quando passados os valores 30 e 3', () => {
  it('retorna 10.0 no caso do terceiro parâmetro ser ":"', () => {
    const response = calculator(30, 3, ':');

    expect(response).to.be.equals(10.0);
  });
});

describe('Quando passados os valores 9 e 3', () => {
  it('retorna 0 no caso do terceiro parâmetro ser "resto da divisao"', () => {
    const response = calculator(9, 3, 'resto da divisao');

    expect(response).to.be.equals(0);
  });
});
