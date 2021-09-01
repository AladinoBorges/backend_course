// todo: Algoritmo que recebe três números como parâmetros:

const MIN_VALUE = 50;
const MAX_NUMBER = 100;
const QUANTITY_OF_NUMBERS = 3;

const numbers = [5, 2, 6];

// * 1. se todos os parâmetros forem numéricos aplicar a fórmula: ((a + b) * c).
function calculator(values = numbers) {
  const result = (values[0] + values[1]) * values[2];

  return result;
}

// * 2. rejeitar a promise caso um dos parâmetros não seja um número;
// * 3. se o resultado seja menor que 50, rejeitar a Promise;
// * 4. se o resultado for maior que 50, resolva a Promise com o valor obtido.

function numbersValidator(arrayOfNumbers) {
  return new Promise((resolve, reject) => {
    const justNumbersValidator = arrayOfNumbers.every(
      (element) => typeof element === "number",
    );

    // 2º caso:
    if (!justNumbersValidator) {
      reject(Error("Por favor, informe apenas números."));
    }

    // 1º caso:
    const result = calculator(arrayOfNumbers);

    // 3º e 4º casos:
    if (result < MIN_VALUE) {
      reject(Error("Valor muito baixo."));
    } else {
      resolve(result);
    }
  });
}

// todo: Escreva um código para consumir a função construída no exercício anterior:
// * 1. gerar um número aleatório de 1 a 100 por parâmetro da função.
function arrayOfRandomNumbers(maxNumber, quantity) {
  const ONE = 1;
  const generatedNumbers = [];

  for (let counter = 1; counter <= quantity; counter++) {
    const numberGenerator = Math.floor(Math.random() * maxNumber + ONE); // ou:
    //* const numbers = Array.from({ length: quantity }).map(randonGeneratorFunction);

    generatedNumbers.push(numberGenerator);
  }

  return generatedNumbers;
}

// todo: Utilize then e catch para manipular a Promise retornada pela função:
// * 1. Chame a função do exercício anterior, passando os três números aleatórios como parâmetros.
const generatedNumbers = arrayOfRandomNumbers(MAX_NUMBER, QUANTITY_OF_NUMBERS);

// * 2. Caso a Promise seja rejeitada, escreva na tela o motivo da rejeição.
// * 3. Caso a Promise seja resolvida, escreva na tela o resultado do cálculo.
function handlesCalculatorResults(values) {
  numbersValidator(values)
    .then((result) => console.log(`\nSucesso. Resultado:\n${result}`))
    .catch(({ message }) => console.error(`\nErro: ${message}`));
}

handlesCalculatorResults(generatedNumbers);
