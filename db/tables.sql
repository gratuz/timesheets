CREATE TABLE items(
 id serial PRIMARY KEY,
 userid VARCHAR(36) NOT NULL,
 merchantid VARCHAR (36) NOT NULL,
 description VARCHAR (50) NOT NULL,
 date DATE NOT NULL DEFAULT CURRENT_DATE,
 timestart INT NOT NULL,
 duration INT
);


CREATE TABLE merchants(
 id serial PRIMARY KEY,
 userid VARCHAR(36) NOT NULL,
 name VARCHAR (50) NOT NULL,
 rate INT DEFAULT 0,
 created_date DATE NOT NULL DEFAULT CURRENT_DATE
);


CREATE TABLE users(
 id serial PRIMARY KEY,
 username VARCHAR(36) NOT NULL,
 sourcesystemid VARCHAR(36) NOT NULL,
 sourceidsystem VARCHAR (50) NOT NULL,
 created_date DATE NOT NULL DEFAULT CURRENT_DATE
);
