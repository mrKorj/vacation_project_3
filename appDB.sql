CREATE DATABASE appDB;
USE appDB;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    password VARCHAR(30) NOT NULL,
    PRIMARY KEY (id),
    INDEX userName (userName)
);

CREATE TABLE vacations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    descript VARCHAR(200) NOT NULL,
    beginDate DATE NOT NULL,
    expDate DATE NOT NULL,
    pictureUrl VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    countFollowers INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE follow (
    id INT NOT NULL AUTO_INCREMENT,
    vacationId INT NOT NULL,
    userId INT NOT NULL,
    follow TINYINT DEFAULT FALSE,
    PRIMARY KEY (id),
    INDEX userId (userId),
    INDEX vacationId (vacationId),
);

CREATE TABLE administrators (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO administrators (name, password)
VALUES ('admin', '1234'), ('chen', '12345'); 
