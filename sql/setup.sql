-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS neopets;

CREATE TABLE neopets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    age INT NOT NULL,
    color TEXT NOT NULL
);

INSERT INTO
    neopets (name, type, age, color)
VALUES
    ('Michelle', 'Jubjub', 5, 'Purple'),
    ('Witch King of Angmar', 'Grundo', 700, 'Black');