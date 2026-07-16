import pool from "../config/db.js";

/* Crear itinerario */
export async function createItineraryQ(
  name,
  description,
  start_date,
  closing_date,
  is_public,
  id_user
) {

  const sql = `
      INSERT INTO itineraries
      (
        name,
        description,
        start_date,
        closing_date,
        is_public,
        id_user
      )
      VALUES
      (
        $1,$2,$3,$4,$5,$6
      )
      RETURNING *;
  `;

  const values = [
    name,
    description,
    start_date,
    closing_date,
    is_public,
    id_user,
  ];

  const result = await pool.query(sql, values);

  return result.rows[0];

}

/* Obtener itinerarios */
export async function getUserItinerariesQ(id_user) {

  const sql = `
      SELECT
        i.id,
        i.name,
        i.description,
        i.start_date,
        i.closing_date,
        i.is_public,
        COUNT(DISTINCT ip.id) AS places_count,
        COUNT(DISTINCT ie.id) AS events_count
      FROM itineraries i
      LEFT JOIN itinerary_places ip ON ip.id_itinerary = i.id
      LEFT JOIN itinerary_events ie ON ie.id_itinerary = i.id
      WHERE i.id_user = $1
      GROUP BY i.id
      ORDER BY i.id DESC;
  `;

  const result = await pool.query(sql, [id_user]);

  return result.rows.map((row) => ({
    ...row,
    places_count: Number(row.places_count),
    events_count: Number(row.events_count),
  }));

}

/* Agregar lugar */
export async function addPlaceToItineraryQ(
id_itinerary,
  id_place
) {

  const sql = `
      INSERT INTO itinerary_places
      (
        id_itinerary,
        id_place,
        position
      )
      VALUES
      (
        $1,
        $2,
        (
            SELECT
                COALESCE(MAX(position),0)+1
            FROM itinerary_places
            WHERE id_itinerary=$1
        )
      );
  `;

  await pool.query(sql, [id_itinerary, id_place]);

}

/* Agregar evento */
export async function addEventToItineraryQ(
  id_itinerary,
  id_event
) {

  const sql = `
      INSERT INTO itinerary_events
      (
        id_itinerary,
        id_event,
        position
      )
      VALUES
      (
        $1,
        $2,
        (
            SELECT
                COALESCE(MAX(position),0)+1
            FROM itinerary_events
            WHERE id_itinerary=$1
        )
      );
  `;

  await pool.query(sql, [id_itinerary, id_event]);

}

/* Obtener detalle */
export async function getItineraryDetailQ(id) {

  const sql = `
      SELECT
        *
      FROM itineraries
      WHERE id=$1;
  `;

  const itinerary = await pool.query(sql, [id]);

  return itinerary.rows[0];

}


export async function getItineraryByIdQuery(id) {

  // Itinerario
  const itinerarySql = `
    SELECT
      id,
      name,
      description,
      start_date,
      closing_date,
      is_public,
      is_active
    FROM itineraries
    WHERE id = $1;
  `;

  // Lugares
  const placesSql = `
    SELECT
      p.id,
      p.place,
      p.address,
      p.image,
      ip.position
    FROM itinerary_places ip
    INNER JOIN places p
      ON p.id = ip.id_place
    WHERE ip.id_itinerary = $1
    ORDER BY ip.position;
  `;

  // Eventos
  const eventsSql = `
    SELECT
      e.id,
      e.name,
      e.image,
      e.start_date,
      e.address,
      ie.position
    FROM itinerary_events ie
    INNER JOIN events e
      ON e.id = ie.id_event
    WHERE ie.id_itinerary = $1
    ORDER BY ie.position;
  `;

  const itineraryResult = await pool.query(itinerarySql,[id]);
  const placesResult = await pool.query(placesSql,[id]);
  const eventsResult = await pool.query(eventsSql,[id]);

  return {
    ...itineraryResult.rows[0],
    places: placesResult.rows,
    events: eventsResult.rows
  };

}