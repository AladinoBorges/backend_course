-- Escreva uma query que exiba a string "Existem Number cientistas na tabela Scientists.", em que Number se refira a quantidade de cientistas.
USE scientists;

SELECT 
    CONCAT('Existem ',
            COUNT(Name),
            ' cientistas na tabela scientists.') AS 'number_of_scientists'
FROM
    scientists;
