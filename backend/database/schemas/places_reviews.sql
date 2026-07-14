CREATE TABLE places_reviews (

    id SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    comments VARCHAR(500),
    score DECIMAL(2,1)
        CHECK(score BETWEEN 0 AND 5),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    id_place INT NOT NULL,

    CONSTRAINT uq_place_review
        UNIQUE(id_user,id_place),

    CONSTRAINT fk_places_review_user
        FOREIGN KEY(id_user)
        REFERENCES users(id),

    CONSTRAINT fk_places_review_place
        FOREIGN KEY(id_place)
        REFERENCES places(id)
        ON DELETE CASCADE
);