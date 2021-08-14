-- Escreva uma query para exibir o nome como "Nome do Projeto" e as horas como "Tempo de Trabalho" de cada projeto.
USE scientist;

SELECT 
    Name AS 'project_name', Hours AS 'work_time'
FROM
    projects;
