CREATE TABLE events_images (

    id SERIAL PRIMARY KEY,
    id_event INT NOT NULL,
    name VARCHAR(150),
    image_url VARCHAR(500) NOT NULL,

    CONSTRAINT fk_event_image
        FOREIGN KEY(id_event)
        REFERENCES events(id)
        ON DELETE CASCADE
);