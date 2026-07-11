INSERT INTO roles (name) VALUES ('explorador');
INSERT INTO roles (name) VALUES ('organizador');
INSERT INTO roles (name) VALUES ('administrador');

ALTER TABLE places
ADD COLUMN featured BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE events
ADD COLUMN featured BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE events
ADD COLUMN start_date DATE NOT NULL;
ALTER TABLE events
ADD COLUMN end_date DATE NOT NULL;
ALTER TABLE events
ADD COLUMN description TEXT;

insert into categories (name) values ('categoria1');

INSERT INTO places (name, description, address, featured, id_category,id_user)
VALUES
(
'Gran Malecón del Río',
'Paseo turístico a orillas del río Magdalena con restaurantes, zonas verdes y miradores.',
'Vía 40 #79B-06, Barranquilla',
TRUE,
 1,
 1
),
(
'Ventana al Mundo',
'Monumento icónico de Barranquilla que representa el desarrollo y la identidad de la ciudad.',
'Glorieta de la Vía 40 con Circunvalar, Barranquilla',
TRUE,
 1,
 1
),
(
'Museo del Carnaval',
'Museo interactivo donde se conserva la historia y tradición del Carnaval de Barranquilla.',
'Cra. 54 #49B-39, Barrio Abajo, Barranquilla',
TRUE,
 1,
 1
),
(
'Ecoparque Ciénaga de Mallorquín',
'Reserva natural ideal para el avistamiento de aves, senderismo y recorridos ecológicos.',
'Vía 40, Sector Mallorquín, Barranquilla',
FALSE,
 1,
 1
),
(
'Plaza de la Paz',
'Plaza pública ubicada frente a la Catedral Metropolitana, escenario de eventos culturales.',
'Calle 53 con Carrera 46, Barranquilla',
FALSE,
 1,
 1
),
(
'Castillo de Salgar',
'Fortificación histórica ubicada sobre un acantilado con vista al mar Caribe.',
'Puerto Colombia, Atlántico',
FALSE,
 1,
 1
);