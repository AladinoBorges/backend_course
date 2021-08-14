USE sakila;

-- SELF JOIN
SELECT 
    t1.title, t1.replacement_cost, t2.title, t2.replacement_cost
FROM
    film AS t1,
    film AS t2
WHERE
    t1.length = t2.length;

-- Queremos saber os ids e custos de substituição dos filmes que possuem o mesmo custo de substituição.
SELECT 
    f1.film_id AS `first movie id`,
    f1.replacement_cost AS `first movie replacement cost`,
    f2.film_id AS `second movie id`,
    f2.replacement_cost AS `second movie replacement cost`
FROM
    film AS f1,
    film AS f2
WHERE
    f1.replacement_cost = f2.replacement_cost;

-- Exiba o título e a duração de empréstimo dos filmes que possuem a mesma duração. Exiba apenas os filmes com a duração de empréstimo entre 2 e 4 dias.
SELECT 
    f1.title, f1.rental_duration, f2.title, f2.rental_duration
FROM
    film AS f1,
    film AS f2
WHERE
    f1.length = f2.length
        HAVING (f1.rental_duration BETWEEN 2 AND 4
        AND f2.rental_duration BETWEEN 2 AND 4);
