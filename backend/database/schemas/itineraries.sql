CREATE TABLE itineraries (

    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    closing_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    id_user INT NOT NULL,

    CONSTRAINT chk_itinerary_dates
        CHECK(closing_date >= start_date),

    CONSTRAINT fk_itinerary_user
        FOREIGN KEY(id_user)
        REFERENCES users(id)
);