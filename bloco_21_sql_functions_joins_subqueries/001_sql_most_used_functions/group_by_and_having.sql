-- GROUP BY
-- Os resultados de uma query podem ser agrupados por uma ou mais colunas usando o GROUP BY , o que faz com que todos os registros que têm o mesmo valor para tais colunas sejam exibidos juntos. O GROUP BY também pode ser usado em conjunto com as funções de agregação que vimos anteriormente.
-- O GROUP BY pode ser construído da seguinte forma:

-- SELECT coluna(s) FROM tabela
-- GROUP BY coluna(s);

USE sakila;

SELECT 
    first_name
FROM
    actor
GROUP BY first_name;

-- Se você executar a query anterior no seu banco de dados sakila , verá que são retornados 108 resultados. Porém, se retirar o GROUP BY , como na query abaixo, notará que existem 200 registros na tabela actor , isso acontece, pelo fato de ele agrupar todos os registros que possuem o mesmo first_name , evitando duplicações na hora de retornar os dados. Ou seja,  GROUP BY removerá duplicações, retornando apenas um valor da coluna usada no agrupamento.
SELECT 
    first_name
FROM
    actor;
    
-- Porém é mais comum utilizar o GROUP BY em conjunto com o AVG , MIN , MAX , SUM ou COUNT. Por exemplo, caso queiramos saber quantos registros existem na tabela de cada nome registrado, podemos usar o COUNT(). Assim, teremos uma informação mais fácil de ser compreendida.

-- GROUP BY COUNT
SELECT 
    first_name, COUNT(*) AS 'Quantidade de registros'
FROM
    actor
GROUP BY first_name;

-- GROUP BY AVG
SELECT 
    rating,
    AVG(length) AS 'Média de duração da classificação do filme'
FROM
    film
GROUP BY rating;

-- GROUP BY MIN
SELECT 
    rating,
    MIN(replacement_cost) AS 'Valor mínimo de reposição de acordo com a classificação do filme'
FROM
    film
GROUP BY rating;

-- GROUP BY MAX
SELECT 
    rating,
    MAX(replacement_cost) AS 'Valor máximo de reposição de acordo com a classificação do filme'
FROM
    film
GROUP BY rating;

-- GROUP BY SUM
SELECT 
    rating,
    SUM(replacement_cost) AS 'Somatório de reposição de acordo com a classificação do filme'
FROM
    film
GROUP BY rating;

-- GROUP BY HAVING
-- Podemos usar o HAVING para filtrar resultados agrupados, assim como usamos o SELECT...WHERE para filtrar resultados individuais.
SELECT 
    first_name, COUNT(*) AS number_of_repetitions
FROM
    actor
GROUP BY first_name
HAVING number_of_repetitions > 2;

-- É importante entender que quando usamos o HAVING estamos filtrando somente os resultados gerados após o GROUP BY ter sido executado.
