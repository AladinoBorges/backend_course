-- Escreva uma query para exibir o nome dos cientistas em ordem alfabética.
USE scientists;

SELECT 
    name
FROM
    scientists
ORDER BY name ASC;