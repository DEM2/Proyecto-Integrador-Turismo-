CREATE TABLE events_images (

    id SERIAL PRIMARY KEY,

    id_event INT NOT NULL,

    name VARCHAR(150),

    images BYTEA,

    CONSTRAINT fk_event_image
        FOREIGN KEY(id_event)
        REFERENCES events(id)
);