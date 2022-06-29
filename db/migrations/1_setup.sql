DROP TABLE IF EXISTS players;

CREATE TABLE playesr (
    id serial PRIMARY KEY,
    username varchar(100) NOT NULL,
    points INT 
);

DROP TABLE IF EXISTS animals;

CREATE TABLE animals(
    id serial PRIMARY KEY,
    word varchar(100) NOT NULL
);


DROP TABLE IF EXISTS food;

CREATE TABLE food(
    id serial PRIMARY KEY,
    word varchar(100) NOT NULL
);


DROP TABLE IF EXISTS random;

CREATE TABLE random(
    id serial PRIMARY KEY,
    word varchar(100) NOT NULL
);

INSERT INTO animals(word)
VALUES
('Hamster'),
('Alligator'),
('Rhino'),
('Kangaroo'),
('Turtle');

INSERT INTO food(word)
VALUES
('Spaghetti'),
('Black Pudding'),
('Bangers and Mash'),
('Bruschetta'),
('Pizza');


INSERT INTO random(word)
VALUES 
('Feather'),
('Brick'),
('Garden'),
('Castle'),
('Court');
