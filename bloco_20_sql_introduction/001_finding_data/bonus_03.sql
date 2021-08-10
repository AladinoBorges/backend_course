-- Escreva uma query para exibir o nome das empresas e preço das peças com os quatro maiores preços, começando a lista a partir do 3º item.
USE piecesproviders;

SELECT 
    Provider, Price
FROM
    provides
ORDER BY Price
LIMIT 4 OFFSET 3;
