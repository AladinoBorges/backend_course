USE sakila;

-- Converte o texto da string para CAIXA ALTA
SELECT UCASE('Oi, eu sou uma string');

-- Converte o texto da string para caixa baixa
SELECT LCASE('Oi, eu sou uma string');

-- Substitui as ocorrências de uma substring em uma string
SELECT REPLACE('Oi, eu sou uma string', 'string', 'cadeia de caracteres');

-- Retorna a parte da esquerda de uma string de acordo com o número de caracteres especificado
SELECT LEFT('Oi, eu sou uma string', 3);

-- Retorna a parte da direita de uma string de acordo com o número de caracteres especificado
SELECT RIGHT('Oi, eu sou um string', 6);

-- Exibe o tamanho, em caracteres, da string
SELECT LENGTH('Oi, eu sou uma string');

-- Extrai parte de uma string de acordo com o índice de um caractere inicial e a quantidade de caracteres a extrair
SELECT SUBSTRING('Oi, eu sou uma string', 5, 2);

-- Se a quantidade de caracteres a extrair não for definida, então a string será extraída do índice inicial definido, até o seu final
SELECT SUBSTRING('Oi, eu sou uma string', 5);

-- PRATICAR:
-- SELECT UPPERCASE
SELECT 
    UCASE(title) AS 'return_uppercase'
FROM
    film
LIMIT 10;

-- SELECT LOWERCASE
SELECT 
    LCASE(title) AS 'return_lowercase'
FROM
    film
LIMIT 10;

-- SELECT REPLACE
SELECT 
    REPLACE(title, 'ACADEMY', 'FOO') AS 'return_replaced'
FROM
    film
WHERE
    (film_id = '1');

-- SELECT LEFT
SELECT 
    LEFT(title, 7) AS 'return_left'
FROM
    film
WHERE
    (film_id = '1');

-- SELECT RIGHT
SELECT 
    RIGHT(title, 8) AS 'return_right'
FROM
    film
WHERE
    (film_id = '1');

-- SELECT LENGTH
SELECT 
    LENGTH(title) AS 'return_length'
FROM
    film
WHERE
    (film_id = '1');

-- SELECT SUBSTRING COM QUANTIDADE A SER EXTRAÍDA DEFINIDA
SELECT 
    SUBSTRING(title, 5, 2) AS 'return_substring'
FROM
    film
WHERE
    (film_id = '1');

-- SELECT SUBSTRING SEM QUANTIDADE A SER EXTRATÍDA DEFINIDA
SELECT 
    SUBSTRING(title, 5) AS 'return_substring'
FROM
    film
WHERE
    (film_id = '1');
