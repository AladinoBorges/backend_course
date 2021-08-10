-- Escreva uma query para exibir o nome do segundo projeto com menor quantidade de horas.
USE scientists;

SELECT 
    Name
FROM
    projects
ORDER BY Hours ASC
LIMIT 1 OFFSET 1;
