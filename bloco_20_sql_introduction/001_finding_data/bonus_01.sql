-- Escreva uma query para exibir a peça e o preço de tudo que é provido pela empresa RBT.
USE piecesproviders;

SELECT 
    Piece, Price
FROM
    provides
WHERE
    Provider = 'RBT';
