CREATE TABLE places_images (

    id SERIAL PRIMARY KEY,

    id_place INT NOT NULL,

    images BYTEA,

    name VARCHAR(150),

    CONSTRAINT fk_place_image
        FOREIGN KEY(id_place)
        REFERENCES places(id)
);