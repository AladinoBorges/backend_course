const { questionFloat } = require("readline-sync");

function IMC(p, a) {
  const TWO = 2;

  const result = (p / Math.pow(a, TWO)).toFixed(2);

  return result;
}

function pegaPesoAltura() {
  const peso = questionFloat("insira o seu peso no formato 63.45: ");
  const altura = questionFloat("insira a sua altura no formato 1.73: ");

  return IMC(peso, altura);
}

function message(imc, text) {
  const toReturn = `O seu índice de massa corporal é: ${imc}. Você está ${text}.`;

  console.log(toReturn);
}

function verificaSaude() {
  const imc = pegaPesoAltura();

  const opcaoA = "abaixo do peso(magreza)";
  const opcaoB = "com peso normal";
  const opcaoC = "acima do peso (sobrepeso)";
  const opcaoD = "com obesidade grau I";
  const opcaoE = "com obesidade grau II";
  const opcaoF = "com obesidade grau III";

  switch (true) {
    case imc < 18.5:
      message(imc, opcaoA);
      break;
    case imc >= 18.5 && imc <= 24.9:
      message(imc, opcaoB);
      break;
    case imc >= 25.0 && imc <= 29.9:
      message(imc, opcaoC);
      break;
    case imc >= 30.0 && imc <= 34.9:
      message(imc, opcaoD);
      break;
    case imc >= 35.0 && imc <= 39.9:
      message(imc, opcaoE);
      break;
    default:
      message(imc, opcaoF);
      break;
  }
}

verificaSaude();
