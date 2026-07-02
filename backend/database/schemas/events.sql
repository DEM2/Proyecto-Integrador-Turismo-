CREATE TABLE events (

    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    id_category INT NOT NULL,

    location VARCHAR(255),

    id_user INT NOT NULL,

    CONSTRAINT fk_events_category
        FOREIGN KEY(id_category)
        REFERENCES categories(id),

    CONSTRAINT fk_events_user
        FOREIGN KEY(id_user)
        REFERENCES users(id)
);