CREATE TABLE events (

    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    start_time TIME,
    price DECIMAL(10,2) DEFAULT 0,
    address VARCHAR(500),
    image_main VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_category INT NOT NULL,
    id_user INT NOT NULL,

    CONSTRAINT chk_event_dates
        CHECK (end_date IS NULL OR end_date >= start_date),

    CONSTRAINT fk_events_category
        FOREIGN KEY(id_category)
        REFERENCES categories(id),

    CONSTRAINT fk_events_user
        FOREIGN KEY(id_user)
        REFERENCES users(id)
);