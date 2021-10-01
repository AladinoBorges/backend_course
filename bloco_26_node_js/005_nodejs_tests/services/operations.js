function addition(firstNumber, secondNumber) {
  const result = firstNumber + secondNumber;

  return result;
}

function subtraction(firstNumber, secondNumber) {
  const result = firstNumber - secondNumber;

  return result;
}

function division(firstNumber, secondNumber) {
  const result = Number((firstNumber / secondNumber).toFixed(2));

  return result;
}

function multiplication(firstNumber, secondNumber) {
  const result = firstNumber * secondNumber;

  return result;
}

function modulus(firstNumber, secondNumber) {
  const result = firstNumber % secondNumber;

  return result;
}

const operations = { addition, subtraction, division, multiplication, modulus };

module.exports = operations;
