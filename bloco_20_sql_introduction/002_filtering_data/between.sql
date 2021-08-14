-- BETWEEN
USE sakila;

-- Buscar usando números
SELECT 
    title, length
FROM
    film
WHERE
    length BETWEEN 50 AND 120
ORDER BY length ASC, title ASC;

-- Buscar usando strings
SELECT 
    *
FROM
    language
WHERE
    name BETWEEN 'Italian' AND 'Mandarin'
ORDER BY name ASC;

-- buscar usando datas: para usar o BETWEEN com datas, basta que você digite o valor no formato padrão da data, que é YYYY-MM-DD HH:MM:SS , sendo os valores de horas, minutos e segundos opcionais.
SELECT 
    rental_id, rental_date
FROM
    rental
WHERE
    rental_date BETWEEN '2005-05-27' AND '2005-07-17';
