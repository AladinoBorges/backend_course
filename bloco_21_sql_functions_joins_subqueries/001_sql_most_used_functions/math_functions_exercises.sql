-- Monte uma query que gere um valor entre 15 e 20.
SELECT ROUND(15 + (RAND() * 5)) AS 'Gerar um número aleatório entre 15 e 20';

-- Monte uma query que exiba o valor arredondado de 15.7515971 com uma precisão de 5 casas decimais.
SELECT ROUND(15.7515971, 5) AS 'Arredondar 5 casas decimais de 15.7515971';

-- Estamos com uma média de 39.494 de vendas de camisas por mês. Qual é o valor aproximado para baixo dessa média?
SELECT FLOOR(39.494) AS 'Arredondar 39.494 por baixo';

-- Temos uma taxa de inscrição de 85.234% no curso de fotografia para iniciantes. Qual é o valor aproximado para cima dessa média?
SELECT CEIL(85.234) AS 'Arredondar por cima 85.234';
