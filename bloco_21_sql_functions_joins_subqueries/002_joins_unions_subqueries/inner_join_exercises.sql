USE sakila;

-- Monte uma query que exiba o id do ator, nome do ator e id do filme em que ele já atuou usando as tabelas actor e film_actor.
SELECT 
    act.actor_id,
    CONCAT(act.first_name, ' ', act.last_name) AS fullname,
    film_act.film_id
FROM
    actor AS act
        INNER JOIN
    film_actor AS film_act ON act.actor_id = film_act.actor_id;

-- Use o JOIN para exibir o nome , sobrenome e endereço de cada um dos funcionários do banco. Use as tabelas staff e address.
SELECT 
    staff.first_name, staff.last_name, address.address
FROM
    staff AS staff
        INNER JOIN
    address AS address ON staff.address_id = address.address_id;

-- Exiba o id do cliente , nome e email dos primeiros 100 clientes, ordenados pelo nome em ordem decrescente, juntamente com o id do endereço e o nome da rua onde o cliente mora. Essas informações podem ser encontradas nas tabelas customer e address.
SELECT 
    customer.customer_id,
    CONCAT(customer.first_name,
            ' ',
            customer.last_name) AS fullname,
    customer.email,
    customer.address_id,
    address.address
FROM
    customer AS customer
        INNER JOIN
    address AS address ON customer.address_id = address.address_id
ORDER BY fullname DESC
LIMIT 100;

-- Exiba o nome , email , id do endereço , endereço e distrito dos clientes que moram no distrito da California e que contêm "rene" em seus nomes. As informações podem ser encontradas nas tabelas address e customer.
SELECT 
    CONCAT(customer.first_name,
            ' ',
            customer.last_name) AS fullname,
	customer.email,
    address.address_id,
    address.address,
    address.district
FROM
    customer AS customer
        INNER JOIN
    address AS address ON customer.address_id = address.address_id
WHERE
    address.district = 'California'
        AND (customer.first_name LIKE '%rene%'
        OR customer.last_name LIKE '%rene%');

-- Exiba o nome e a quantidade de endereços dos clientes cadastrados. Ordene seus resultados por nomes de forma decrescente. Exiba somente os clientes ativos. As informações podem ser encontradas na tabela address e customer.
SELECT 
    CONCAT(customer.first_name,
            ' ',
            customer.last_name) AS fullname,
    COUNT(address.address) AS `number of addresses`
FROM
    customer AS customer
        INNER JOIN
    address AS address ON customer.address_id = address.address_id
WHERE
    customer.active = 1
GROUP BY fullname
ORDER BY fullname DESC;

-- Monte uma query que exiba o nome , sobrenome e a média de valor ( amount ) paga aos funcionários no ano de 2006. Use as tabelas payment e staff . Os resultados devem estar agrupados pelo nome e sobrenome do funcionário.
SELECT 
    CONCAT(staff.first_name, ' ', staff.last_name) AS fullname,
    ROUND(AVG(payment.amount), 2) as 'payment average'
FROM
    staff AS staff
        INNER JOIN
    payment AS payment ON staff.staff_id = payment.staff_id
WHERE YEAR(payment.payment_date) = 2006
GROUP BY fullname
ORDER BY fullname ASC;

-- Monte uma query que exiba o id do ator , nome , id do filme e título do filme , usando as tabelas actor , film_actor e film . Dica: você precisará fazer mais de um JOIN na mesma query.
SELECT 
    actor.actor_id,
    CONCAT(actor.first_name, ' ', actor.last_name) AS fullname,
    film.film_id,
    film.title
FROM
    actor AS actor
        INNER JOIN
    film_actor AS film_actor ON actor.actor_id = film_actor.actor_id
        INNER JOIN
    film AS film ON film_actor.film_id = film.film_id
ORDER BY film.title ASC , fullname ASC;
