USE sakila;

-- SINTAXE
-- SELECT t1.coluna, t2.coluna
-- FROM tabela1 AS t1
-- INNER JOIN tabela2 AS t2
-- ON t1.coluna_em_comum = t2.coluna_em_comum;
SELECT 
    a.first_name, a.actor_id, f.actor_id
FROM
    actor AS a
        INNER JOIN
    film_actor AS f
ON
    a.actor_id = f.actor_id;

