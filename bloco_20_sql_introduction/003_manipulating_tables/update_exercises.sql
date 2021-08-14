USE sakila;

-- Atualize o primeiro nome de todas as pessoas da tabela sakila.actor que possuem o primeiro nome "JULIA" para "JULES".
UPDATE actor 
SET 
    first_name = 'JULES'
WHERE
    first_name = 'JULIA' AND actor_id >= 1;
    
-- SELECT * FROM actor WHERE first_name = 'jules';
-- Foi exigido que a categoria "Sci-Fi" seja alterada para "Science Fiction".
UPDATE category 
SET 
    `name` = 'Science Fiction'
WHERE
    `name` = 'Sci-Fi' AND category_id > 0;

-- SELECT * FROM category;
-- Atualize o valor do aluguel para $25 de todos os filmes com duração maior que 100 minutos e que possuem a classificações "G" , "PG" ou "PG-13" e um custo de substituição maior que $20.
UPDATE film 
SET 
    rental_rate = 25
WHERE
    length > 100
        AND rating IN ('G' , 'PG', 'PG-13')
        AND replacement_cost > 20;

-- SELECT rental_rate, length, rating, replacement_cost, last_update FROM film ORDER BY last_update DESC, length ASC LIMIT 173;
-- Foi determinado pelo setor financeiro que haverá um reajuste em todos os preços dos filmes, com base em sua duração. Para todos os filmes com duração entre 0 e 100, o valor do aluguel passará a ser $10,00, e o aluguel dos filmes com duração acima de 100 passará a ser de $20,00.
UPDATE film 
SET 
    rental_rate = (
		CASE
			WHEN length BETWEEN 1 AND 100 THEN 10
			WHEN length > 100 THEN 20
		END)
WHERE
    film_id > 0;

-- SELECT rental_rate, length FROM film ORDER BY length ASC, rental_rate ASC;
