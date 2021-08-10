USE sakila;

-- SINTAXE
-- SELECT IF(condicao, valor_se_verdadeiro, valor_se_falso);
-- SELECT IF(idade >= 18, 'Maior de idade', 'Menor de Idade') FROM pessoas;
-- SELECT IF(aberto, 'Entrada permitida', 'Entrada não permitida') FROM estabelecimentos;

-- Exemplo utilizando o banco sakila:
SELECT first_name, IF(active, 'Cliente Ativo', 'Cliente Inativo') AS 'status'
FROM sakila.customer
LIMIT 20;

-- Em situações em que é preciso comparar mais de uma condição, é preferível utilizar o CASE:
-- SELECT CASE
-- 	WHEN condição THEN valor
--     ELSE valor_padrão
-- END;

-- SELECT nome, nivel_acesso,
-- 	CASE
-- 		WHEN nível_acesso = 1 THEN 'Nível de acesso 1'
-- 		WHEN nível_acesso = 2 THEN 'Nível de acesso 2'
-- 		WHEN nível_acesso = 3 THEN 'Nível de acesso 3'
-- 		ELSE 'Usuário sem acesso'
-- 	END AS 'nível_acesso'
-- FROM persmissões_usuário;

-- Exemplo utilizando a tabela film do banco de dados sakila:
SELECT 
    first_name,
    email,
    CASE
        WHEN email = 'MARY.SMITH@sakilacustomer.org' THEN 'Cliente de baixo valor'
        WHEN email = 'PATRICIA.JOHNSON@sakilacustomer.org' THEN 'Cliente de médio valor'
        WHEN email = 'LINDA.WILLIAMS@sakilacustomer.org' THEN 'Cliente de alto valor'
        ELSE 'não classificado'
    END AS 'valor'
FROM
    customer
LIMIT 15;
