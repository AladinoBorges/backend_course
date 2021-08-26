//? O conceito de uma Promise, ou um objeto Promise, não é muito diferente da ideia de uma promessa na vida real: alguém se compromete com outra pessoa a fazer algo. Essa promessa pode ser cumprida e, portanto, resolvida, ou algo pode dar errado, fazendo com que não seja possível cumprir a promessa, que será então rejeitada. Promises no JavaScript funcionam do mesmo jeito: uma promessa é criada, e dentro dela existe código a ser executado. Se o código é executado sem nenhum problema, a Promise é resolvida através da função resolve, que veremos daqui a pouco. Se algo dá errado durante a execução do código, a Promise é rejeitada através da função reject.
function divisionCalculator(num1, num2) {
  const promise = new Promise((resolve, reject) => {
    if (num2 === 0) reject(Error("Não é possível dividir um número por zero."));

    const division = num1 / num2;
    resolve(division);
  });

  return promise;
}

divisionCalculator(2, 0)
  .then((result) => console.log(`Sucesso: ${result}`))
  .catch(({ message }) => console.log(`Erro: ${message}`));

//* No segundo exemplo, repare que a função dividirNumeros retorna uma Promise, ou seja: ela promete que vai dividir os números. Caso não consiga realizar a divisão, ela rejeita essa promessa, utilizando a função reject. Caso dê tudo certo, ela resolve a promessa, utilizando a função resolve. Tudo que será realizado de forma assíncrona, ou seja, em segundo plano, pode também ser encarado da mesma forma. Quando pedirmos, por exemplo, para o que o Node.js leia um arquivo do disco, ele nos retornará uma promessa de que vai ler esse arquivo. Se der tudo certo, essa promessa será resolvida. Caso contrário, ela será rejeitada.
