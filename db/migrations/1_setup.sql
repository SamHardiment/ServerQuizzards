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
('Angelfish'),
('Black Widow Spider'),
('Bumblebee'),
('Crab'),
('Cuttlefish'),
('Duck'),
('Elk'),
('Flea'),
('Squirrel'),
('Vampire Bat'),
('Grass Snake'),
('Jackal'),
('Komodo Dragon'),
('Lemur'),
('Locust'),
('Manta Ray'),
('Cobra'),
('Narwhal'),
('Dolphin'),
('Octopus');

INSERT INTO food(word)
VALUES
('apple'),
('Avocado'),
('Burrito'),
('Cake'),
('Chicken'),
('Bacon'),
('Oysters'),
('Donuts'),
('Sushi'),
('Curry'),
('Ice Cream'),
('Pancakes'),
('Nutella'),
('Fruit Salad'),
('Chips and cheese'),
('Ketchup'),
('Honey'),
('Steak'),
('Halloumi'),
('Beans');


INSERT INTO random(word)
VALUES 
('River'),
('Cloud'),
('Balls'),
('Tea'),
('Park'),
('Sock'),
('Student'),
('Forest'),
('Lorry'),
('Hell'),
('Cruise Ship'),
('Pool'),
('Waves'),
('Highway'),
('Umbrella'),
('Knight'),
('Wizard'),
('Dinosaur'),
('Prison'),
('Igloo');
