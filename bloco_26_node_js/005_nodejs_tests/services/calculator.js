const { addition, subtraction, division, multiplication, modulus } = require('./operations');

function calculator(firstNumber, secondNumber, operation) {
  const formatedOperation = String(operation).toLowerCase();

  switch (formatedOperation) {
    case 'sum':
    case 'mais':
    case 'soma':
    case 'addition':
    case 'adição':
    case 'adicao':
    case '+':
      return addition(firstNumber, secondNumber);
    case 'subraction':
    case 'subtract':
    case 'subtrair':
    case 'menos':
    case 'subtracao':
    case 'subtração':
    case '-':
      return subtraction(firstNumber, secondNumber);
    case 'multiply':
    case 'multiplication':
    case 'multiplicar':
    case 'multiplicacao':
    case 'multiplicação':
    case 'x':
    case '*':
      return multiplication(firstNumber, secondNumber);
    case 'divide':
    case 'division':
    case 'dividir':
    case 'divisao':
    case 'divisão':
    case '/':
    case ':':
      return division(firstNumber, secondNumber);
    case 'modulus':
    case 'module':
    case 'modulo':
    case 'módulo':
    case 'resto':
    case 'resto da divisao':
    case 'resto da divisão':
    case 'resto do modulo':
    case 'resto do módulo':
    case '%':
      return modulus(firstNumber, secondNumber);
    default:
      break;
  }
}

module.exports = { calculator };
