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