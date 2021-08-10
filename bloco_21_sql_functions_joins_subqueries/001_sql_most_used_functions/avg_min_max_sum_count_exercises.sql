USE sakila;

-- Monte um query que exiba:
-- * A média de duração dos filmes e dê o nome da coluna de 'Média de Duração';
SELECT 
    AVG(length) AS 'Média de Duração'
FROM
    film;

-- * A duração mínima dos filmes como 'Duração Mínima';
SELECT 
    MIN(length) AS 'Duração Mínima'
FROM
    film;

-- * A duração máxima dos filmes como 'Duração Máxima';


-- * A soma de todas as durações como 'Tempo de Exibição Total';
SELECT 
    SUM(length) AS 'Tempo de Exibição Total'
FROM
    film;

-- * E finalmente, a quantidade total de filmes cadastrados na tabela sakila.film como 'Filmes Registrados'.
SELECT 
    COUNT(film_id) AS 'Filmes Registrados'
FROM
    film
WHERE
    film_id IS NOT NULL;

-- Solução de todo o exercício mas usando apenas um SELECT
SELECT AVG(length) AS 'Média de Duração',
	MIN(length) AS 'Duração Mínima',
	MAX(length) AS 'Duração Máxima',
	SUM(length) AS 'Tempo de Exibição Total',
	COUNT(*) AS 'Filmes Registrados'
FROM film;
