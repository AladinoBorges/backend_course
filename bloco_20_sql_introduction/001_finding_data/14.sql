-- Escreva uma query para exibir todas as informações dos cinco projetos com a menor quantidade de horas.
USE scientists;

SELECT 
    *
FROM
    projects
ORDER BY Hours
LIMIT 5;
