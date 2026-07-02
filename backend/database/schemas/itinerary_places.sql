CREATE TABLE itinerary_places (

    id SERIAL PRIMARY KEY,

    id_place INT NOT NULL,

    id_itinerary INT NOT NULL,

    position INT NOT NULL,

    CONSTRAINT fk_ip_place
        FOREIGN KEY(id_place)
        REFERENCES places(id),

    CONSTRAINT fk_ip_itinerary
        FOREIGN KEY(id_itinerary)
        REFERENCES itineraries(id)
);
