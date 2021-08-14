-- Escreva uma query para exibir o nome dos Projetos em ordem alfabética descendente.
USE scientists;

SELECT 
    name
FROM
    scientists
ORDER BY name DESC;