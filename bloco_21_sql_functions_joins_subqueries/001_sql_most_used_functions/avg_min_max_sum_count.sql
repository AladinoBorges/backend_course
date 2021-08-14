USE sakila;

-- AVG (Average): conta a média tendo em conta os valores de uma determinada coluna
SELECT 
    AVG(replacement_cost) AS 'Average'
FROM
    film;

-- MIN (Minimum), MAX (Maximum)
-- MIN (acha o mínimo valor de uma coluna)
SELECT 
    MIN(replacement_cost) AS 'Minimum cost'
FROM
    film;

-- MAX (acha o máximo valor de uma determinada coluna)
SELECT 
    MAX(replacement_cost) AS 'Maximum cost'
FROM
    film;

-- SUM (soma todos os valores de um dada coluna)
SELECT 
    SUM(replacement_cost) AS 'Sum everything from replacement cost'
FROM
    film;

-- COUNT (contar todos os valores de uma dada coluna)
SELECT 
    COUNT(replacement_cost) AS 'Count everything from replacement cost'
FROM
    film;
