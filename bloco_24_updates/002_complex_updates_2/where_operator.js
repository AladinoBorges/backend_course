//? O operador $where pode ser utilizado para passar uma string contendo uma expressão ou função JavaScript . Esse operador é muito flexível, mas requer que o banco de dados processe a expressão ou função passada para cada documento na coleção. O documento é referenciado na expressão ou função usando this ou obj.

//! O operador $where não será explorado porque, na versão 3.6 do MongoDB , um outro operador, $expr , que será visto a seguir, passou a suportar expressões de agregação. O operador $expr é mais rápido do que o $where porque não executa JavaScript . Recomendamo utilizar o $expr utilizá-lo sempre que possível, mas trazemos o $where para mostrar que ele existe.

//* Para saber um pouco mais sobre o operador $where: "https://docs.mongodb.com/manual/reference/operator/query/where/index.html".
