USE sakila;

-- INSERT E INSERT IGNORE
-- Insira dois funcionários novos em apenas uma query
INSERT IGNORE INTO staff
	(
		first_name,
        last_name,
        address_id,
        email,
        store_id,
        `active`,
        username,
        `password`
    )
VALUES
	(
		'Aladino',
        'Borges',
        3,
        'aladino@email.com',
        1,
        1,
        'aladinoborges',
        NULL
    ),
	(
		'Euclides',
        'Manuel',
        3,
        'euclides@email.com',
        1,
        1,
        'aladinoborges',
        NULL
    );

SELECT 
    *
FROM
    staff;

-- INSERT SELECT
INSERT INTO actor (first_name, last_name)
	SELECT first_name, last_name from staff;

SELECT 
    *
FROM
    actor;

-- Selecione os cinco primeiros nomes e sobrenomes da tabela sakila.customer e cadastre essas pessoas como atores na tabela sakila.actor.
INSERT INTO actor (first_name, last_name)
	SELECT first_name, last_name
    FROM customer
    ORDER BY customer_id
    LIMIT 5;

-- Cadastre três categorias de uma vez só na tabela sakila.category.
INSERT INTO category (name)
VALUES
	('Erotic'),
    ('Fantastic'),
    ('Thriller');

-- Cadastre uma nova loja na tabela sakila.store.
iNSERT INTO store (manager_staff_id, address_id)
VALUES (3, 2);
