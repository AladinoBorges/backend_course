USE sakila;

-- SET SQL_SAFE_UPDATES = 0;
-- UPDATE simples
UPDATE staff 
SET 
    first_name = 'John'
WHERE
    first_name = 'Jon' AND staff_id = 2;

-- UPDATE de mais do que uma coluna ao mesmo tempo
-- 1 : CASE modelo
UPDATE staff 
SET 
    first_name = (CASE staff_id
        WHEN 1 THEN 'John'
        WHEN 2 THEN 'Mickey'
        ELSE first_name
    END);

-- 2 : com condições fixas
UPDATE staff 
SET 
    first_name = 'Johnny'
WHERE
    staff_id IN (1 , 2);

-- UPDATE de forma sequencial
-- a) Se o comando ORDER BY for usado juntamente com o UPDATE , os resultados serão alterados na ordem em que forem encontrados.

-- b) Se o comando LIMIT for usado em conjunto com o UPDATE , um limite será imposto na quantidade de resultados que podem ser alterados. Caso contrário, todos os resultados que satisfizerem a condição serão atualizados.
UPDATE staff 
SET 
    `password` = 'testar_a_primeira_mudanca.123456'
WHERE
    `active` = 1 ORDER BY last_update DESC LIMIT 2;
