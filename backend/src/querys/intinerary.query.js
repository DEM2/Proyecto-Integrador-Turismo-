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
        id,
        name,
        description,
        start_date,
        closing_date,
        is_public
      FROM itineraries
      WHERE id_user=$1
      ORDER BY id DESC;
  `;

  const result = await pool.query(sql, [id_user]);

  return result.rows;

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