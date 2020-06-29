CREATE DATABASE appDB;
USE appDB;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(20) NOT NULL,
    firstName VARCHAR(20) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    password VARCHAR(100) NOT NULL,
    registrationDate DATETIME NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    INDEX userName (userName)
);

CREATE TABLE vacations (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL,
    fromDate DATE NOT NULL,
    toDate DATE NOT NULL,
    pictureUrl VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    countFollowers INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    INDEX id (id)
);

CREATE TABLE follow (
    id INT NOT NULL AUTO_INCREMENT,
    vacationId INT NOT NULL,
    userId INT NOT NULL,
    follow TINYINT DEFAULT FALSE,
    PRIMARY KEY (id),
    INDEX userId (userId),
    INDEX vacationId (vacationId)
);

INSERT INTO users (userName, firstName, lastName, password)
VALUES ('admin', 'administrator', 'supervisor', '');
