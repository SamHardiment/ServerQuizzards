DROP TABLE IF EXISTS players;

CREATE TABLE playesr (
    id serial PRIMARY KEY,
    username varchar(100) NOT NULL,
    points INT 
);
