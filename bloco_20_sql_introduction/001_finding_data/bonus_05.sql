-- Escreva uma query para exibir por quantas empresas a peça 1 é provida.
USE piecesproviders;

SELECT 
    *
FROM
    provides
WHERE
    Piece = '1';
