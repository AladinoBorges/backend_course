USE pixar;

-- EXERCÍCIO 8
-- Altere a classificação da tabela BoxOffice para 9.0 de todos os filmes que lucraram mais de 400 milhões no mercado interno.
UPDATE boxoffice 
SET 
    rating = '9.0'
WHERE
    (domestic_sales > 400000000
        AND movie_id > 0);

-- EXERCÍCIO 9:
-- Altere a classificação da tabela BoxOffice para 6.0 de todos os filmes que lucraram menos de 300 milhões no mercado internacional e mais de 200 milhões no mercado interno.
UPDATE boxoffice 
SET 
    rating = '6.0'
WHERE
    (domestic_sales > '200000000'
		AND international_sales < '300000000'
        AND movie_id > '0');

-- EXERCÍCIO 10:
-- Exclua da tabela Movies todos os filmes com menos de 100 minutos de duração.
DELETE FROM boxoffice 
WHERE
    movie_id IN ('1' , '6', '7', '8');

DELETE FROM movies 
WHERE
    (length_minutes < '100'
		AND id > '0');
