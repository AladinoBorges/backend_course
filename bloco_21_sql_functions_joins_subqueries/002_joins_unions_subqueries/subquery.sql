USE sakila;

-- SUBQUERY
-- Usando uma SUBQUERY como fonte de dados para o FROM.
SELECT 
    f.title, f.rating
FROM
    (SELECT 
        *
    FROM
        film
    WHERE
        rating = 'R') AS f;

-- Preenchendo uma coluna de um SELECT por meio de uma SUBQUERY.
SELECT 
    address,
    district,
    (SELECT 
            city
        FROM
            city
        WHERE
            city.city_id = address.city_id) AS city
FROM
    address;

-- Filtrando resultados com WHERE usando como base os dados retornados de uma SUBQUERY.
SELECT 
    address, district
FROM
    address
WHERE
    city_id IN (SELECT 
            city_id
        FROM
            city
        WHERE
            city IN ('Sasebo' , 'San Bernardino', 'Athenai', 'Myingyan'));

-- Usando uma tabela externa, de fora da SUBQUERY, dentro dela.
SELECT 
    first_name,
    (SELECT 
            address
        FROM
            address
        WHERE
            address.address_id = tabela_externa.address_id) AS address
FROM
    customer AS tabela_externa;

-- SUBQUERY ou JOIN
-- Talvez você esteja se perguntando se seria possível resolver as queries anteriores através de um JOIN. De fato, podemos, como é exemplificado a seguir (usando o exemplo imediatamente anterior).
SELECT 
    c.first_name, ad.address
FROM
    customer AS c
        INNER JOIN
    address AS ad ON c.address_id = ad.address_id;
-- No caso, a query mais rápida foi a que usa a SUBQUERY.


