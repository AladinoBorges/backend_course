-- Exercício 10: Utilizando o INNER JOIN, selecione todas as informações dos filmes com avaliação maior que 8 e que estejam em cartaz.
SELECT 
    m.*, b.rating
FROM
    movies AS m
        INNER JOIN
    boxoffice AS b ON b.movie_id = m.id
WHERE
    b.rating > 8
        AND m.theater_id IS NOT NULL;

-- Exercício 11: Utilizando o SELF JOIN, selecione os títulos e duração dos filmes que possuem o mesmo diretor.
SELECT 
    m.title, m.length_minutes, ms.title, ms.length_minutes
FROM
    movies AS m,
    movies AS ms
WHERE
    m.director = ms.director
        AND m.title <> ms.title;

-- Exercício 12: Faça duas buscas, uma utilizando SUBQUERY e outra utilizando INNER JOIN, que retornem o título dos filmes que arrecadaram 500 milhões ou mais, e que possuem duração maior que 110 minutos:
-- SUBQUERY
SELECT 
    m.title
FROM
    movies AS m
WHERE
    m.id IN (SELECT 
            b.movie_id
        FROM
            boxoffice AS b
        WHERE
            b.international_sales >= 500000000
                AND m.length_minutes > 110);

-- INNER JOIN
SELECT 
    m.title
FROM
    movies AS m
        INNER JOIN
    boxoffice AS b ON b.movie_id = m.id
WHERE
    b.international_sales >= 500000000
        AND m.length_minutes > 110;
