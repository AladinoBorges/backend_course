USE sakila;

-- Encontra qualquer resultado finalizando com "don"
SELECT 
    *
FROM
    film
WHERE
    title LIKE '%don';

-- Encontra qualquer resultado iniciando com "plu"
SELECT 
    *
FROM
    film
WHERE
    title LIKE 'plu%';

-- Encontra qualquer resultado que contém "plu"
SELECT 
    *
FROM
    film
WHERE
    title LIKE '%plu%';

-- Encontra qualquer resultado que inicia com "p" e finaliza com "r"
SELECT 
    *
FROM
    film
WHERE
    title LIKE 'p%r';

-- Encontra qualquer resultado em que o segundo caractere da frase é "C"
SELECT 
    *
FROM
    film
WHERE
    title LIKE '_C%';

-- Encontra qualquer resultado em que o título possui exatamente 8 caracteres
SELECT 
    *
FROM
    film
WHERE
    title LIKE '________';

-- Encontra todas as palavras com no mínimo 3 caracteres e que iniciam com E
SELECT 
    *
FROM
    film
WHERE
    title LIKE 'E__%';