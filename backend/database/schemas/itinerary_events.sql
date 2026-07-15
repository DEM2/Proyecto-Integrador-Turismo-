CREATE TABLE itinerary_events (

    id SERIAL PRIMARY KEY,
    id_event INT NOT NULL,
    id_itinerary INT NOT NULL,
    position INT NOT NULL,

    CONSTRAINT uq_itinerary_event
        UNIQUE(id_itinerary,id_event),

    CONSTRAINT uq_itinerary_event_position
        UNIQUE(id_itinerary,position),

    CONSTRAINT fk_ie_event
        FOREIGN KEY(id_event)
        REFERENCES events(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_ie_itinerary
        FOREIGN KEY(id_itinerary)
        REFERENCES itineraries(id)
        ON DELETE CASCADE
);