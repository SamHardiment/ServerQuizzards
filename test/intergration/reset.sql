TRUNCATE TABLE players RESTART IDENTITY;
INSERT INTO player (username, points)
VALUES
    ('Sam', 10),
    ('Will', 20);
