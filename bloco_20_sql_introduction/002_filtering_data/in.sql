-- OPERADOR IN
USE sakila;

SELECT 
    *
FROM
    actor
WHERE
    first_name IN ('PENELOPE' , 'NICK', 'ED', 'JENNIFER');

SELECT 
    *
FROM
    customer
WHERE
    customer_id IN (1 , 2, 3, 4, 5);

-- Encontrar, usando o IN , todos os detalhes sobre o aluguel dos clientes com os seguintes ids: 269, 239, 126, 399, 142.
SELECT 
    *
FROM
    rental
WHERE
    customer_id IN (269 , 239, 126, 399, 142);
    
-- Encontrar todas as informações sobre os endereços que estão registrados nos distritos de QLD, Nagasaki, California, Attika, Mandalay, Nantou e Texas.
SELECT 
    *
FROM
    address
WHERE
    district IN
		(
			'QLD' ,
			'Nagasaki',
			'California',
			'Attika',
			'Mandalay',
			'Nantou',
			'Texas'
		);
