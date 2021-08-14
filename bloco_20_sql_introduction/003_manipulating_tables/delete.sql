USE sakila;

-- DELETE
DELETE FROM film_text 
WHERE
    title = 'academy dinosaur'
    AND film_id > 0;


-- Erros ao tentar executar o DELETE
-- 1. Rejeita o comando DELETE.
-- ON DELETE NO ACTION;

-- 2. Rejeita o comando DELETE.
-- ON DELETE RESTRICT;

-- 3. Permite a exclusão dos registros da tabela pai, e seta para NULL os registros da tabela filho.
-- ON DELETE SET NULL;

-- 4. Exclui a informação da tabela pai e registros relacionados.
-- ON DELETE CASCADE;

-- Para conseguir excluir este a linha da tabela alvo, precisamos primeiro excluir todas as referências a ela nas tabelas em que o mesmo tem uma 'CONSTRAINT':

-- PASSO 1: Tabela com as CONSTRAINTS
DELETE FROM film_actor 
WHERE
    actor_id = 7;

-- PASSO 2: Exluir a linha na tabela que queremos
DELETE FROM actor 
WHERE
    first_name = 'grace' AND actor_id > 0;

-- NOTAS: Antes de excluir dados que possuem restrições de chave estrangeira, como o exemplo que acabamos de ver, analise se você realmente deve excluir essa informação do banco de dados e depois, caso precise, faça de acordo com as restrições que foram impostas durante a criação da tabela.

-- DELETE vs TRUNCATE
-- Se tem certeza absoluta de que quer excluir os registros de uma tabela de uma maneira mais rápida, para efeitos de testes ou necessidade, o TRUNCATE é mais rápido que o DELETE . A função principal e única do TRUNCATE é de limpar (excluir todos os registros) de uma tabela, não sendo possível especificar o WHERE . Por isso, o TRUNCATE só pode ser usado nesse cenário.
-- TRUNCATE banco_de_dados.tabela;
