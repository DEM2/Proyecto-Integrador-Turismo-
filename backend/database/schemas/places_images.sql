CREATE TABLE places_images (

    id SERIAL PRIMARY KEY,
    id_place INT NOT NULL,
    name VARCHAR(150),
    image_url VARCHAR(500) NOT NULL,
    CONSTRAINT fk_place_image
        FOREIGN KEY(id_place)
        REFERENCES places(id)
        ON DELETE CASCADE
);