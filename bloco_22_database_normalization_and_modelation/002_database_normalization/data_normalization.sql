-- Monte uma query que:
-- Cria um banco de dados chamado normalization;
DROP SCHEMA IF EXISTS normalization;
CREATE SCHEMA IF NOT EXISTS normalization;
USE normalization;

-- Cria todas as tabelas resultantes do exercício 2 (na 2ª Forma Normal);
CREATE TABLE sectors (
    sector_id INT AUTO_INCREMENT PRIMARY KEY,
    sector_name VARCHAR(50)
)  ENGINE=INNODB;

CREATE TABLE employee (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20) NOT NULL,
    registration_date DATETIME NOT NULL
)  ENGINE=INNODB;

CREATE TABLE employee_sector (
    employee_id INT NOT NULL,
    sector_id INT NOT NULL,
    FOREIGN KEY (employee_id)
        REFERENCES employee (employee_id),
    FOREIGN KEY (sector_id)
        REFERENCES sectors (sector_id)
)  ENGINE=INNODB;

-- Popular todas as tabelas com os dados fornecidos nos exercícios.
INSERT INTO employee (employee_id, first_name, last_name, email, phone_number, registration_date)
VALUES
(12, 'Joseph', 'Rodrigues', 'jo@gmail.com', '(35)998552-1445', '2020-05-05 08:50:25'),
(13, 'André', 'Freeman', 'andre1990@gmail.com', '(47)99522-4996', '2020-02-05 00:00:00'),
(14, 'Cíntia', 'Duval', 'cindy@outlook.com', '(33)99855-4669', '2020-05-05 10:55:35'),
(15, 'Fernanda', 'Mendes', 'fernandamendes@yahoo.com', '(33)99200-1556', '2020-05-05 11:45:40');

INSERT INTO sectors (sector_name)
VALUES
('Administração'),
('Operacional'),
('Estratégico'),
('Marketing'),
('Vendas');

INSERT INTO employee_sector (employee_id, sector_id)
VALUES
(12, 1),
(12, 5),
(13, 2),
(14, 3),
(14, 5),
(15, 4);
