const { question, questionInt } = require("readline-sync");

function generateNumber() {
  const MIN = 0;
  const MAX = 10;
  const ZERO = 0;

  const randomNumber = Math.floor(Math.random() * (MAX - MIN + ZERO)) + MIN;

  return randomNumber;
}

function gessingGame() {
  const userNumber = questionInt("Insira um número entre zero e dez: ");
  const autoNumber = generateNumber();

  const message = (user, auto, status) => {
    return `Número escolhido: ${user}\nNúmero do sorteio: ${auto}.\nVocê ${status}.`;
  };

  if (userNumber === autoNumber) {
    console.log(message(userNumber, autoNumber, "ganhou"));
  } else {
    console.log(message(userNumber, autoNumber, "não ganhou"));
  }
}

function playGame() {
  gessingGame();

  const playAgain = question("Queres jogar novamente? S/N: ").toLowerCase();

  if (playAgain === "s") {
    playGame();
  } else {
    console.log("Está bem, até a próxima!");
  }
}

playGame();
