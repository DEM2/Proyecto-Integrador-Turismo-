-- 2. SE AÑADIO SECCION DE AGENDA DE EVENTOS CON EL FIN DE AGRUPAR
-- Y ORGANIZAR LAS ACTIVIDADES LOS DÍAS EN LOS QUE UN EVENTO PUEDE DESARROLLARSE
-- PERMITE MOSTRAR LOS HORARIOS QUE SE REALIZAN DURANTE DIAS

CREATE TABLE events_agenda (
    id SERIAL PRIMARY KEY,

    id_event INT NOT NULL,

    activity_date DATE NOT NULL, -- dia del evento
    activity_time TIME, -- hora del evento
    title VARCHAR(150), -- titulo del evento
    is_active BOOLEAN DEFAULT TRUE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_events_agenda_event
        FOREIGN KEY(id_event)
        REFERENCES events(id)
);