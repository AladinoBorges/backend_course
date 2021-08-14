-- Para  consultar a data e hora atuais usando as seguintes funções:
-- CURRENT_DATE, NOW
SELECT CURRENT_DATE() AS 'data atual sem hora';
SELECT NOW() AS 'data atual com hora';

-- PAra calcular a diferença em dias entre duas datas usa-se o DATEDIFF (retorna a quantidade de dias passados) e a diferença de tempo entre dois horários usa-se o TIMEDIFF (retorna a quantidade de horas passadas). Em ambos os casos, o segundo valor é subtraído do primeiro para calcular o resultado.
SELECT DATEDIFF(CURRENT_DATE(), '1991-07-30') AS 'Dias passados desde que nasci';
SELECT DATEDIFF('2022-03-01', CURRENT_DATE()) AS 'Dias que faltam para terminar o curso';

SELECT TIMEDIFF('08:00:00', '20:00:00') AS 'Quantidade de horas entre as 08:00 e as 20:00';

-- Para extrair qualquer parte de uma data da coluna:
-- SELECT DATE(data_cadastro); -- YYYY-MM-DD
-- SELECT YEAR(data_cadastro); -- Ano
-- SELECT MONTH(data_cadastro); -- Mês
-- SELECT DAY(data_cadastro); -- Dia
-- SELECT HOUR(data_cadastro); -- Hora
-- SELECT MINUTE(data_cadastro); -- Minuto
-- SELECT SECOND(data_cadastro); -- Segundo

-- Também podemos usar CURRENT_DATE() e NOW() em conjunto com os comandos acima para encontrar resultados dinâmicos da seguinte maneira:
SELECT YEAR(CURRENT_DATE()) AS 'Ano atual';
SELECT HOUR(NOW()) AS 'Hora atual';
