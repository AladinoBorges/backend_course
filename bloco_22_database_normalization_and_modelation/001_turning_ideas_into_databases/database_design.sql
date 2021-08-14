-- Cria um banco de dados com o nome especificado.
-- CREATE DATABASE nome_do_banco_de_dados;

-- Sinônimo de CREATE DATABASE, também cria um banco de dados.
-- CREATE SCHEMA nome_do_banco_de_dados;

-- Verifica se o banco de dados ainda não existe.
-- Essa verificação é comumente utilizada junto ao CREATE DATABASE para evitar a tentativa de criar um banco de dados duplicado, o que ocasionaria um erro.
-- IF NOT EXISTS nome_do_banco_de_dados;

-- Lista todos os bancos de dados existentes.
-- SHOW DATABASES;

-- Define o banco de dados ativo para uso no momento.
-- USE nome_do_banco_de_dados;

DROP SCHEMA IF EXISTS music;
CREATE SCHEMA IF NOT EXISTS music;
USE music;

-- CRIAR AS TABELAS QUE NÃO REFERENCIAM OUTRAS (NÃO USAM FOREIGN KEYS):
CREATE TABLE genres (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(50) NOT NULL,
    creation_date DATE NOT NULL
)  ENGINE = InnoDB;

CREATE TABLE artists (
    artist_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    stage_name VARCHAR(100) NOT NULL
) ENGINE = InnoDB;

-- CRIAR AS TABELAS QUE REFERENCIAS OUTRAS (USAM FOREIGN KEYS):
CREATE TABLE albums (
    album_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    artist_id INT NOT NULL,
    genre_id INT NOT NULL,
    release_date DATE NOT NULL,
    price DOUBLE NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id),
    FOREIGN KEY (genre_id) REFERENCES genres (genre_id)
) ENGINE = InnoDB;

CREATE TABLE album_artist (
    artist_id INT NOT NULL,
    album_id INT NOT NULL,
    CONSTRAINT PRIMARY KEY (artist_id , album_id),
    FOREIGN KEY (artist_id)
        REFERENCES artists (artist_id),
    FOREIGN KEY (album_id)
        REFERENCES albums (album_id)
) ENGINE = InnoDB;

CREATE TABLE songs (
    song_id INT AUTO_INCREMENT PRIMARY KEY,
    song_name VARCHAR(100) NOT NULL,
    album_id INT NOT NULL,
    FOREIGN KEY (album_id)
        REFERENCES albums (album_id)
)  ENGINE = InnoDB;
