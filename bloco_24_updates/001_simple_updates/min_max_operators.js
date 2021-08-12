//? Aqui temos dois operadores que também são bastante interessantes. Ambos fazem o mesmo tipo de comparação antes de executar a operação, porém em "sentidos" diferentes:
//* $min : altera o valor do campo para o valor especificado se esse valor especificado é menor do que o atual valor do campo;
//* $max : faz o mesmo, porém altera o valor do campo se o valor especificado é maior do que o atual valor do campo.
// use trybe;

/*
    todo: Considere um cenário em que temos uma collection com três documentos, cada documento possui um atributo id e um atributo campo que é um número inteiro:
    * db.collection.find();

    ? RESULTADO:
        * [ { _id: 1, campo: 25 }, { _id: 2, campo: 50 }, { _id: 3, campo: 100 }]

    todo: A seguir, vamos aplicar um update utilizando o operador $max. O nosso intuito é atingir todos os documentos com o atributo campo que possuem um valor de no máximo 75. Nesse caso, o operador não só define o escopo máximo, como também o conteúdo que o campo deve passar a ter:
    * db.collection.updateMany({}, { $max: { campo: 75 } });

    *db.collection.find();

    ? RESULTADO:
        * [ { _id: 1, campo: 75 }, { _id: 2, campo: 75 }, { _id: 3, campo: 100 }]

    ! Portanto, teremos os ids 1 e 2 atingidos, alterando o atributo campo para 75. Com o operador $min é praticamente a mesma coisa, porém na direção inversa.
    * db.collection.updateMany({}, { $min: { campo: 42 } });

    ? RESULTADO:
        * [ { _id: 1, campo: 42 }, { _id: 2, campo: 42 }, { _id: 3, campo: 42 }]
    
    ! Aqui atingimos todas os ids, justamente pelo fato de termos definido um escopo que é de no mínimo, 42. Dessa forma, todos os documentos com atributos campo que tivessem um valor superior, foram redefinidos.
*/

//todo: EXEMPLOS:
//* Comparar números
// use trybe;
db.scores.insertOne({ _id: 1, highScore: 800, lowScore: 200 });

//? No documento de exemplo, o valor atual do campo lowscore é 200. A operação abaixo utiliza o $min para comparar 200 com o valor especificado 150 e altera o valor do campo lowscore para 150 porque 150 é menor do que 200:
db.scores.update({ _id: 1 }, { $min: { lowScore: 150 } });

//? Atualmente, o campo highscore tem o valor 800. A operação abaixo usa o $max para comparar 800 e o valor especificado 950, e então altera o valor do campo highscore para 950 porque 950 é maior que 800:
db.scores.update({ _id: 1 }, { $max: { highScore: 950 } });

//* Comparar datas
db.tags.insertOne({ _id: 1, desc: "crafts", dateEntered: ISODate("2019-10-01T05:00:00Z"), dateExpired: ISODate("2019-10-01T16:38:16Z") });

//? A operação abaixo utiliza o operador $min para comparar o valor do campo dateEntered e altera seu valor porque 25/09/2019 é uma data menor(anterior) do que o valor atual, ao mesmo tempo em que o operador $max também é usado para comparar o valor do campo dateExpired e altera esse valor porque 02/10/2019 é uma data maior(posterior) do que o valor atual:
db.tags.update({ _id: 1 }, { min: { dateEntered: new Date("2019-09-25") }, max: { dateExpired: new Date("2019-10-02") } });
