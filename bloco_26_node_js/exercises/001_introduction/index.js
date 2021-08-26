const { questionInt } = require("readline-sync");

const scripts = [
  { name: "Gessing Game", script: "./guessingGame.js" },
  { name: "Índice de Massa Corporal", script: "./imc.js" },
  { name: "Velocidade Média", script: "./speed.js" },
];

function generateList() {
  const message = scripts
    .map(({ name }, index) => `${index + 1}: ${name}`)
    .join("\n");

  return message;
}

function getAnswers() {
  const userInput =
    questionInt(
      `Insira o número do aplicativo que deseja rodar:\n${generateList()}\n`,
    ) - 1;

  const getScript = scripts[userInput];

  if (getScript) {
    require(getScript.script);
  } else {
    console.log("Número inválido. A sair da aplicação ...");
  }
}

getAnswers();
