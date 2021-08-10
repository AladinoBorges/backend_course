-- EXISTS
-- Usando o EXISTS na tabela books_lent e books , exiba o id e título dos livros que ainda não foram emprestados.
USE hotel;

SELECT 
    Id, Title
FROM
    books AS b
WHERE
    NOT EXISTS( SELECT 
            *
        FROM
            books_lent
        WHERE
            b.Id = book_id);

-- Usando o EXISTS na tabela books_lent e books , exiba o id e título dos livros estão atualmente emprestados e que contêm a palavra "lost" no título.
SELECT 
    Id, Title
FROM
    books AS b
WHERE
    EXISTS( SELECT 
            *
        FROM
            books_lent
        WHERE
            b.Id = book_id AND Title LIKE '%lost%');

-- Usando a tabela carsales e customers , exiba apenas o nome dos clientes que ainda não compraram um carro.
SELECT 
    Name
FROM
    customers AS c
WHERE
    NOT EXISTS( SELECT 
            *
        FROM
            carsales
        WHERE
            c.CustomerId = CustomerID);

-- Usando o comando EXISTS em conjunto com JOIN e as tabelas cars , customers e carsales, exiba o nome do cliente e o modelo do carro de todos os clientes que fizeram compras de carros.
SELECT 
    customer.Name, car.Name
FROM
    cars AS car
        INNER JOIN
    customers AS customer
WHERE
    EXISTS( SELECT 
            *
        FROM
            carsales
        WHERE
            CustomerID = customer.CustomerId
                AND carID = car.Id);
