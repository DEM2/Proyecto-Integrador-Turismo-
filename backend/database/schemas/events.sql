CREATE TABLE events (

    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    -- 1. Se añadira información adicional al esquema de eventos para la pag
    description TEXT, -- texto sobre el evento
    start_date DATE, -- fecha inicial del evento
    end_date DATE, -- fecha final del evento
    start_time TIME, -- hora inicial del evento
    price DECIMAL(10,2) DEFAULT 0, -- valor de la entrada del evento
    address VARCHAR(500) -- dirección del evento
    image_main VARCHAR(500), -- ruta de la imagen de prueba

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