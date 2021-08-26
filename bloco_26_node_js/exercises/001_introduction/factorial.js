const { questionInt } = require("readline-sync");

function getNumber() {
  const userInput = questionInt(
    "Insira um número inteiro para calcular o seu factorial: \n",
  );

  if (userInput <= 0) {
    console.log("Insira um número maior que zero.\n");
    getNumber();
  }

  return userInput;
}

function factorial() {
  let number = getNumber();
  const INITIAL = number - 1;

  for (let i = INITIAL; i >= 1; i--) {
    number *= i;
  }

  console.log(number);
}

factorial();
