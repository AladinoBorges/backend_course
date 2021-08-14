USE SAKILA;
-- Precisamos identificar os dados do cliente com o e-mail LEONARD.SCHOFIELD@sakilacustomer.org.
SELECT 
    *
FROM
    customer
WHERE
    email = 'LEONARD.SCHOFIELD@sakilacustomer.org';

-- Precisamos de um relatório dos nomes dos clientes, em ordem alfabética , que não estão mais ativos no nosso sistema e pertencem à loja com o id = 2 , e não inclua o cliente KENNETH no resultado.
SELECT 
    first_name
FROM
    customer
WHERE
    active IS NOT TRUE
		AND store_id = 2
        AND first_name <> 'KENNETH';

-- O setor financeiro quer saber título, descrição, ano de lançamento e valor do custo de substituição ( replacement_cost ), dos 100 filmes com o maior custo de substituição, do valor mais alto ao mais baixo, entre os filmes feitos para menores de idade e que têm o custo mínimo de substituição de $18,00 dólares. Em caso de empate, ordene em ordem alfabética pelo título.
SELECT 
    title, description, release_year, replacement_cost
FROM
    film
WHERE
    (rating <> 'R' OR rating <> 'NC-17'
        OR rating <> 'PG-13')
        AND replacement_cost >= '18.00'
ORDER BY replacement_cost DESC , title ASC
LIMIT 100;

-- Quantos clientes estão ativos e na loja 1?
SELECT 
    COUNT(active) AS 'active_clients_from_store_1'
FROM
    customer
WHERE
    store_id = 1
		AND active IS TRUE;

-- Mostre todos os detalhes dos clientes que não estão ativos na loja 1.
SELECT 
    *
FROM
    customer
WHERE
    active IS NOT TRUE
		AND store_id = 1;

-- Precisamos descobrir quais são os 50 filmes feitos apenas para adultos com a menor taxa de aluguel, para que possamos fazer uma divulgação melhor desses filmes. Em caso de empate, ordene em ordem alfabética pelo título.
SELECT 
    *
FROM
    film
WHERE
    rating = 'NC-17'
ORDER BY rental_rate ASC , title ASC
LIMIT 50;

-- NOTA: Você vai se deparar também com casos em que você só tem parte de uma informação, ou em que precisa criar queries mais dinâmicas. Para esses casos, temos o LIKE.
