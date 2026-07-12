CREATE TABLE events_reviews (

    id SERIAL PRIMARY KEY,

    id_user INT NOT NULL,

    comments VARCHAR(500),
    score DECIMAL(2,1),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    is_active BOOLEAN DEFAULT TRUE,

    id_event INT NOT NULL,

    CONSTRAINT fk_review_user
        FOREIGN KEY(id_user)
        REFERENCES users(id),

    CONSTRAINT fk_review_event
        FOREIGN KEY(id_event)
        REFERENCES events(id)
);