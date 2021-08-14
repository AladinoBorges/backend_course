USE pixar;
-- Exercício 1: Utilizando o INNER JOIN, encontre as vendas nacionais (domestic_sales) e internacionais (international_sales) de cada filme.
SELECT 
    m.title, bo1.domestic_sales, bo1.international_sales
FROM
    movies AS m
        INNER JOIN
    boxoffice AS bo1 ON bo1.movie_id = m.id;

-- Exercício 2: Utilizando o INNER JOIN, faça uma busca que retorne o número de vendas para cada filme que possui um número maior de vendas internacionais (international_sales) do que vendas nacionais (domestic_sales).
SELECT 
    m.title, b.international_sales, b.domestic_sales
FROM
    movies AS m
        INNER JOIN
    boxoffice AS b ON b.movie_id = m.id
WHERE
    b.international_sales > b.domestic_sales;

-- Exercício 3: Utilizando o INNER JOIN, faça uma busca que retorne os filmes e sua avaliação (rating) em ordem decrescente.
SELECT 
    m.title AS title, b.rating AS rating
FROM
    movies AS m
        INNER JOIN
    boxoffice AS b ON b.movie_id = m.id
ORDER BY rating DESC;

-- Exercício 4: Utilizando o LEFT JOIN, faça uma busca que retorne todos os dados dos cinemas, mesmo os que não possuem filmes em cartaz e, adicionalmente, os dados dos filmes que estão em cartaz nestes cinemas. Retorne os nomes dos cinemas em ordem alfabética.
SELECT 
    t.`name` AS `name`,
    t.location,
    m.title,
    m.director,
    m.`year`,
    m.length_minutes
FROM
    theater AS t
        LEFT JOIN
    movies AS m ON m.theater_id = t.id
ORDER BY `name` ASC;

-- Exercício 5: Utilizando o RIGHT JOIN, faça uma busca que retorne todos os dados dos filmes, mesmo os que não estão em cartaz e, adicionalmente, os dados dos cinemas que possuem estes filmes em cartaz. Retorne os nomes dos cinemas em ordem alfabética.
SELECT 
    m.title,
    m.director,
    m.`year`,
    m.length_minutes,
    t.`name` AS `name`,
    t.location
FROM
    theater AS t
        RIGHT JOIN
    movies AS m ON m.theater_id = t.id
ORDER BY `name` ASC;

-- Exercício 6: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN, que retornem os títulos dos filmes que possuem avaliação maior que 7.5:
-- INNER JOIN
SELECT 
    m.title, b.rating AS rating
FROM
    movies AS m
        INNER JOIN
    boxoffice AS b ON b.movie_id = m.id
WHERE
    rating > 7.5;

-- SUBQUERY
SELECT 
    m.title
FROM
    movies AS m
WHERE
    m.id IN (SELECT 
            movie_id
        FROM
            boxoffice
        WHERE
            rating > 7.5);

-- Exercício 7: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN, que retornem as avaliações dos filmes lançados depois de 2009:
-- INNER JOIN
SELECT 
    b.rating, m.`year`
FROM
    boxoffice AS b
        INNER JOIN
    movies AS m ON b.movie_id = m.id
WHERE
    m.`year` > 2009;

-- SUBQUERY
SELECT 
    rating
FROM
    boxoffice
WHERE
    movie_id IN (SELECT 
            id
        FROM
            movies
        WHERE
            `year` > 2009);

-- Exercício 8: Utilizando o EXISTS, selecione o nome e localização dos cinemas que possuem filmes em cartaz.
SELECT 
    `name`, location
FROM
    theater AS t
WHERE
    EXISTS( SELECT 
            *
        FROM
            movies
        WHERE
            t.id = theater_id);

-- Exercício 9: Utilizando o EXISTS, selecione o nome e localização dos cinemas que não possuem filmes em cartaz.
SELECT 
    `name`, location
FROM
    theater AS t
WHERE
    NOT EXISTS( SELECT 
            *
        FROM
            movies
        WHERE
            t.id = theater_id);
