CREATE TABLE itinerary_places (

    id SERIAL PRIMARY KEY,
    id_place INT NOT NULL,
    id_itinerary INT NOT NULL,
    position INT NOT NULL,

    CONSTRAINT uq_itinerary_place
        UNIQUE(id_itinerary,id_place),

    CONSTRAINT uq_itinerary_place_position
        UNIQUE(id_itinerary,position),

    CONSTRAINT fk_ip_place
        FOREIGN KEY(id_place)
        REFERENCES places(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ip_itinerary
        FOREIGN KEY(id_itinerary)
        REFERENCES itineraries(id)
        ON DELETE CASCADE
);
