DROP TABLE IF EXISTS players;

CREATE TABLE playesr (
    id serial PRIMARY KEY,
    username varchar(100) NOT NULL,
    points INT 
);

DROP TABLE IF EXISTS animals;

CREATE TABLE animals(
    id serial PRIMARY KEY,
    animal varchar(100) NOT NULL
);


DROP TABLE IF EXISTS food;

CREATE TABLE food (
    id serial PRIMARY KEY,
    animal varchar(100) NOT NULL,
);


DROP TABLE IF EXISTS random;

CREATE TABLE random (
    id serial PRIMARY KEY,
    animal varchar(100) NOT NULL,
);
