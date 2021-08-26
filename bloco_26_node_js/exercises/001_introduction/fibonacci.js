const { questionInt } = require("readline-sync");

function getNumber() {
  const userInput = questionInt("Insira um número inteiro: \n");

  if (userInput <= 0) {
    console.log("\nPor favor insira um número inteiro maior que zero:\n");
    getNumber();
  } else {
    return userInput;
  }
}

function fibonacci() {
  const number = getNumber();
  let temp = 1;
  const result = [temp];

  for (let i = 1; i < number; i++) {
    if (i === 1) {
      result.push(i);
    } else {
      result.push(temp + result[i - 1]);
      temp = result[i - 1];
    }
  }

  return console.log(`Sequência de fibonacci do número ${number}: ${result}`);
}

fibonacci();
