CREATE TABLE itinerary_events (

    id SERIAL PRIMARY KEY,

    id_event INT NOT NULL,

    id_itinerary INT NOT NULL,

    position INT NOT NULL,

    CONSTRAINT fk_ie_event
        FOREIGN KEY(id_event)
        REFERENCES events(id),

    CONSTRAINT fk_ie_itinerary
        FOREIGN KEY(id_itinerary)
        REFERENCES itineraries(id)
);