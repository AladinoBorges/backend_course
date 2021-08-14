USE pixar;

-- EXERCÍCIO 1:
-- Insira as produções da Pixar abaixo na tabela Movies:
-- * Monstros SA, de Pete Docter, lançado em 2001, com 92 minutos de duração.
-- * Procurando Nemo, de John Lasseter, lançado em 2003, com 107 minutos de duração.
-- * Os Incríveis, de Brad Bird, lançado em 2004, com 116 minutos de duração.
-- * WALL-E, de Pete Docter, lançada em 2008, com 104 minutos de duração.
INSERT INTO movies (title, director, `year`, length_minutes)
VALUES
	('Monstros SA', 'Pet Docter', '2001', '92'),
	('Nemo', 'John Lasseter', '2003', '107'),
    ('Os Incríveis', 'Brad Bird', '2004', '116'),
    ('WALL-E', 'Pete Docter', '2008', '104');

-- EXERCÍCIO 2:
-- Procurando Nemo (movie_id = 9) foi aclamado pela crítica! Foi classificado em 6.8, fez 450 milhões no mercado interno e 370 milhões no mercado internacional. Adicione as informações à tabela BoxOffice.
INSERT INTO boxoffice (movie_id, rating, domestic_sales, international_sales)
VALUES ('9', '6.8', '450000000', '370000000');

-- EXERCÍCIO 3:
-- O diretor do filme "Procurando Nemo" está incorreto, na verdade ele foi dirigido por Andrew Staton. Corrija esse dado utilizando o UPDATE.
UPDATE movies 
SET 
    director = 'Andrew Staton'
WHERE
    (id = '9');

-- EXERCÍCIO 4:
-- O título do filme "Ratatouille" esta escrito de forma incorreta na tabela Movies, além disso, o filme foi lançado em 2007 e não em 2010. Corrija esses dados utilizando o UPDATE.
UPDATE movies 
SET 
    title = 'Ratatouille',
    `year` = '2007'
WHERE
    (title = 'ratatui'
		AND id = '3');

-- EXERCÍCIO 5:
-- Insira as novas classificações abaixo na tabela BoxOffice, lembre-se que a coluna movie_id é uma foreign key referente a coluna id da tabela Movies:
-- * Monsters SA (8), classificado em 8.5, lucrou 300 milhões no mercado interno e 250 milhões no mercado internacional.
-- * Os Incríveis (10), classificado em 7.4, lucrou 460 milhões no mercado interno e 510 milhões no mercado internacional.
-- * WALL-E (11), classificado em 9.9, lucrou 290 milhões no mercado interno e 280 milhões no mercado internacional.
INSERT INTO boxoffice (movie_id, rating, domestic_sales, international_sales)
VALUES
	('8', '8.5', '300000000', '250000000'),
    ('10', '7.4', '460000000', '510000000'),
    ('11', '9.9', '290000000', '280000000');

-- EXERCÍCIO 6:
-- Exclua da tabela Movies (11) o filme "WALL-E".
DELETE FROM boxoffice 
WHERE
    (movie_id = '11');

DELETE FROM movies 
WHERE
    (title = 'WALL-E'
		AND id = '11');

-- EXERCÍCIO 7:
-- Exclua da tabela Movies todos os filmes dirigidos por "Andrew Staton" (2, 9).
DELETE FROM boxoffice 
WHERE
    movie_id IN ('2' , '9');

DELETE FROM movies 
WHERE
    (director = 'Andrew Staton'
		AND id IN ('2' , '9'));
