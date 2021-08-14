-- DATE
USE sakila;

-- Com DATE (ignora horas, minutos e segundos)
SELECT 
    *
FROM
    payment
WHERE
    DATE(payment_date) = '2005-07-31'
LIMIT 10;

-- Sem DATE (com LIKE para encontrar valores aproximados)
SELECT 
    *
FROM
    payment
WHERE
    payment_date LIKE '2005-07-31%'
LIMIT 10;

-- Sem DATE (com LIKE para dia e hora exatos)
SELECT 
    *
FROM
    payment
WHERE
    payment_date LIKE '2005-08-20 00:30:52'
LIMIT 10;

-- Sem DATE (com BETWEEN para achar entre um valor mínimo e máximo)
SELECT 
    *
FROM
    payment
WHERE
    payment_date BETWEEN '2005-05-26 00:00:00' AND '2005-05-27 23:59:59';

-- Às vezes você está interessado em apenas uma parte de uma data, como o ano ou as horas. MySQL possui funções que retornam partes específicas de uma data ou hora:
-- DATE, YEAR, MONTH, DAY, HOUR, MINUTE, SECOND.

-- DATE
SELECT 
    DATE(payment_date) AS 'return_full_date'
FROM
    payment;

-- YEAR
SELECT 
    YEAR(payment_date) AS 'return_year_only'
FROM
    payment;

-- MONTH
SELECT 
    MONTH(payment_date) AS 'return_month_only'
FROM
    payment;

-- DAY
SELECT 
    DAY(payment_date) AS 'return_day_only'
FROM
    payment;
    
-- HOUR
SELECT 
    HOUR(payment_date) AS 'return_hour_only'
FROM
    payment;
    
-- MINUTE
SELECT 
    MINUTE(payment_date) AS 'return_minute_only'
FROM
    payment;

-- SECOND
SELECT 
    SECOND(payment_date) AS 'return_second_only'
FROM
    payment;
