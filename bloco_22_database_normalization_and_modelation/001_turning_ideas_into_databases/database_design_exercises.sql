DROP SCHEMA IF EXISTS zoo;
CREATE SCHEMA IF NOT EXISTS zoo;
USE zoo;

CREATE TABLE species (
    species_id INT AUTO_INCREMENT PRIMARY KEY,
    species_name VARCHAR(50)
)  ENGINE=INNODB;

CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(100)
)  ENGINE=INNODB;

CREATE TABLE managers (
    manager_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL
)  ENGINE=INNODB;

CREATE TABLE caregivers (
    carer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (manager_id)
        REFERENCES managers (manager_id)
)  ENGINE=INNODB;

CREATE TABLE animals (
    animal_id INT AUTO_INCREMENT PRIMARY KEY,
    animal_name VARCHAR(50),
    age INT NOT NULL,
    birth_date DATE NOT NULL,
    species_id INT NOT NULL,
    gender VARCHAR(6) NOT NULL,
    location_id INT NOT NULL,
    carer_id INT NOT NULL,
    FOREIGN KEY (species_id)
        REFERENCES species (species_id),
    FOREIGN KEY (location_id)
        REFERENCES locations (location_id),
    FOREIGN KEY (carer_id)
        REFERENCES caregivers (carer_id)
)  ENGINE=INNODB;
