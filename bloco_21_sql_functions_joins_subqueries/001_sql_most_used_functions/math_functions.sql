USE sakila;

-- Adição, Subtração, Multiplicação, Divisão, DIV (dividir números inteiros), MOD (calcular o resto, o mesmo que % em JavaScript)
SELECT 5 + 5 AS 'sum';
SELECT 6 - 4 AS 'subtract';
SELECT 7 * 3 AS 'multiply';
SELECT 8 / 2 AS 'divide';

-- Usando informações retiradas do banco de dados
-- SUM
SELECT 
    rental_duration + rental_rate AS 'sum_rental_duration_and_rental_rate'
FROM
    film
LIMIT 10;

-- SUBTRACT
SELECT 
    rental_duration - rental_rate AS 'subtract_rental_duration_and_rental_rate'
FROM
    film
LIMIT 10;

-- MULTIPLY
SELECT 
    rental_duration * rental_rate AS 'multiply_rental_duration_and_rental_rate'
FROM
    film
LIMIT 10;

-- DIVIDE
SELECT 
    rental_duration / rental_rate AS 'divide_rental_duration_and_rental_rate'
FROM
    film
LIMIT 10;

-- DIV (retorna o resultado inteiro de uma divisão, ignorando as casas decimais de um número)
SELECT 10 DIV 2 AS 'return_DIV';
SELECT 15 DIV 3 AS 'return_DIV';

-- MOD (retorna o resto de uma divisão como resultado)
SELECT 15 MOD 2 AS 'return_MOD';

-- Monte uma query usando o MOD juntamente com o IF para descobrir se o valor 15 é par ou ímpar. Chame essa coluna de 'Par ou Ímpar' , onde ela pode dizer 'Par' ou 'Ímpar'.
SELECT IF(16 MOD 2 <> 0, 'Ímpar', 'Par') AS 'Par ou Ímpar';

-- Temos uma sala de cinema que comporta 220 pessoas. Quantos grupos completos de 12 pessoas podemos levar ao cinema sem que ninguém fique de fora?
SELECT (220 DIV 12) AS 'Número de Grupos';

-- Utilizando o resultado anterior, responda à seguinte pergunta: temos lugares sobrando? Se sim, quantos?
SELECT (220 MOD 12) AS 'Lugares Desocupados';

-- ROUND: arredonda os números de acordo com sua parte decimal. Se for maior ou igual a 0.5, o resultado é um arredondamento para cima. Caso contrário, ocorre um arredondamento para baixo.
SELECT ROUND(10.4924) AS 'Arredondar sem casas decimais, inteiro';
SELECT ROUND(10.5124) AS 'Arredondar sem casas decimais, inteiro';
SELECT ROUND(10.5924, 2) AS 'Arredondar com duas casas decimais, inteiro';
SELECT ROUND(10.5924, 3) AS 'Arredondar com três casas decimais, inteiro';

-- CEIL: arredondamento sempre para cima.
SELECT CEIL(10.51) AS 'Arredondar por cima';
SELECT CEIL(10.49) AS 'Arredondar por cima';
SELECT CEIL(10.2) AS 'Arredondar por cima';

-- FLOOR: arredondamento sempre para baixo.
SELECT FLOOR(10.51) AS 'Arredondar por baixo';
SELECT FLOOR(10.49) AS 'Arredondar por baixo';
SELECT FLOOR(10.2) AS 'Arredondar por baixo';

-- EXPONENCIAÇÃO (POW) E RAIZ QUADRADA (SQRT)
SELECT POW(2, 2) AS '2 elevado a 2';
SELECT POW(2, 4) AS '2 elevado a ';

SELECT SQRT(9) AS 'Raiz quadrada de 9';
SELECT SQRT(16) AS 'Raiz quadrada de 16';

-- RAND: para situações em que se faz necessário gerar valores aleatórios, podemos usar a função RAND , em conjunto com as funções anteriores.
-- Para gerar um valor aleatório entre 0 e 1:
SELECT RAND() AS 'Gerar número aleatória entre 0 e 1';

SELECT ROUND(7 + (RAND() * 6)) AS 'Gerar número aleatório entre 1 e 13';
