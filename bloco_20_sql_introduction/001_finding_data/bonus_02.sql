-- Escreve uma query para exibir todas as informações das cinco peças com os maiores preços.
USE piecesproviders;

SELECT 
    *
FROM
    provides
ORDER BY Price DESC
LIMIT 5;
