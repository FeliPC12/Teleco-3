CREATE DATABASE myflaskapp;
use myflaskapp;

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    username varchar(255),
    password varchar(255)
);

CREATE TABLE products (
            code int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            nombre varchar(255),
            costo varchar(255),
            cantidad varchar(255),
            peso varchar(255)
);


INSERT INTO users VALUES(null, "juan", "juan@gmail.com", "juan", "123"),
    (null, "maria", "maria@gmail.com", "maria", "456");

INSERT INTO products VALUES(null, "celular xiaomi", "3M", "1", "20g"),
    (null, "carne", "14000", "2", "35g");
