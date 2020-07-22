create DATABASE appDB;
USE appDB;

create TABLE users
(
    id               INT          NOT NULL AUTO_INCREMENT,
    userName         VARCHAR(20)  NOT NULL,
    firstName        VARCHAR(20)  NOT NULL,
    lastName         VARCHAR(20)  NOT NULL,
    password         VARCHAR(100) NOT NULL,
    registrationDate DATETIME     NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    INDEX userName (userName)
);

create TABLE vacations
(
    id             INT          NOT NULL AUTO_INCREMENT,
    name           VARCHAR(30)  NOT NULL,
    description    VARCHAR(200) NOT NULL,
    fromDate       DATE         NOT NULL,
    toDate         DATE         NOT NULL,
    pictureUrl     VARCHAR(50)  NOT NULL,
    price          INT          NOT NULL,
    countFollowers INT          NOT NULL DEFAULT 0,
    likes          INT          NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    INDEX id (id)
);

create TABLE follow
(
    id         INT NOT NULL AUTO_INCREMENT,
    vacationId INT NOT NULL,
    userId     INT NOT NULL,
    follow     TINYINT DEFAULT FALSE,
    PRIMARY KEY (id),
    INDEX userId (userId),
    INDEX vacationId (vacationId)
);

insert into users (userName, firstName, lastName, password)
values ('admin', 'administrator', 'supervisor', '');

insert into vacations (name, description, fromDate, toDate, pictureUrl, price)
values ('Ski in Austria', 'Family Ski vacation in Austria', '2020-12-25', '2021-01-10', 'upload/ski.jpg', 2599),
       ('Sidney', 'Incredible trip to Sidney', '2020-11-02', '2020-11-12', 'upload/sidney.jpg', 1699),
       ('Flying in Alps', 'Vacation in Alps', '2020-08-12', '2020-08-18', 'upload/sky.jpg', 1300),
       ('Tokyo Japan', 'Vacation in Tokyo Japan', '2020-08-01', '2020-08-08', 'upload/tokyo.jpg', 1100),
       ('Norway Adventures', 'Vacation in Norway', '2021-06-10', '2021-06-15', 'upload/norway-adventures.jpg', 1200),
       ('Switzerland', 'Vacation in Switzerland', '2021-07-15', '2021-07-21', 'upload/Switzerland.jpg', 1250),
       ('Disneyland California', 'Vacation in Disneyland California', '2020-09-12', '2020-09-18','upload/disneyland.jpg', 1999),
       ('Italy Venice', 'Vacation in Italy Venice', '2020-09-12', '2020-09-18', 'upload/italy.jpg', 599),
       ('Krakow Poland', 'Vacation in Krakow Poland', '2020-11-12', '2020-11-18', 'upload/Krakow.jpg', 450),
       ('London', 'Vacation in London', '2020-10-05', '2020-10-10', 'upload/london.jpg', 899),
       ('France Paris', 'Vacation in France Paris', '2020-08-18', '2020-08-22', 'upload/paris.jpg', 650);
