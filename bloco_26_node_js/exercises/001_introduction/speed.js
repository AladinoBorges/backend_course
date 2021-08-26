const { questionInt } = require("readline-sync");

function speedCalculator(distance, time) {
  const formula = (distance / time).toFixed(2);

  return formula;
}

function getDistanceTime() {
  const distance = questionInt("Insira a distância percorrida em metros: ");
  const time = questionInt("Insira o tempo de duração da viagem em segundos: ");

  const result = speedCalculator(distance, time);

  const message = `A velocidade média da viagem é: ${result} m/s.`;

  console.log(message);
}

getDistanceTime();
