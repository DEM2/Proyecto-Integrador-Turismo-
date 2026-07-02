CREATE TABLE places (

    id SERIAL PRIMARY KEY,

    description TEXT,

    address VARCHAR(250),

    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    is_active BOOLEAN DEFAULT TRUE,

    id_category INT NOT NULL,

    id_user INT NOT NULL,

    name VARCHAR(150) NOT NULL,

    CONSTRAINT fk_places_category
        FOREIGN KEY(id_category)
        REFERENCES categories(id),

    CONSTRAINT fk_places_user
        FOREIGN KEY(id_user)
        REFERENCES users(id)
);