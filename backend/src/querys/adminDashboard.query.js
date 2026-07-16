import pool from "../config/db.js";

export async function countAdminDashboardUsers() {
  const sql = `
    SELECT COUNT(*) AS total_users
    FROM users;
  `;

  const result = await pool.query(sql);
  return result.rows[0] || null;
}

export async function countAdminDashboardEvents() {
  const sql = `
    SELECT COUNT(*) AS total_events
    FROM events;
  `;

  const result = await pool.query(sql);
  return result.rows[0] || null;
}

export async function countAdminDashboardPlaces() {
  const sql = `
    SELECT COUNT(*) AS total_places
    FROM places;
  `;

  const result = await pool.query(sql);
  return result.rows[0] || null;
}

export async function countAdminDashboardReviews() {
  const sql = `
    SELECT COUNT(*) AS total_reviews
    FROM (
      SELECT id FROM events_reviews
      UNION ALL
      SELECT id FROM places_reviews
    ) reviews;
  `;

  const result = await pool.query(sql);
  return result.rows[0] || null;
}

export async function countAdminDashboardPendingOrganizers() {
  const sql = `
    SELECT COUNT(*) AS total_pending_organizers
    FROM users u
    INNER JOIN roles r
      ON r.id = u.id_role
    WHERE LOWER(r.name) = 'organizador'
      AND u.is_active = false;
  `;

  const result = await pool.query(sql);
  return result.rows[0] || null;
}

export async function getAdminDashboardPendingOrganizers() {
  const sql = `
    SELECT
      u.id,
      u.name,
      u.last_name,
      u.email,
      TO_CHAR(u.created_at, 'DD/MM/YYYY') AS requested_at
    FROM users u
    INNER JOIN roles r
      ON r.id = u.id_role
    WHERE LOWER(r.name) = 'organizador'
      AND u.is_active = false
    ORDER BY u.created_at DESC
    LIMIT 2;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardRecentReviews() {
  const sql = `
    select events_reviews.comments,
       TO_CHAR(events_reviews.created_at, 'YYYY-MM-DD') as created_at,
       TO_CHAR(events_reviews.updated_at, 'YYYY-MM-DD') as updated_at,
       users.name from events_reviews
      inner join users on events_reviews.id_user = users.id
      limit 3

      UNION ALL

      select places_reviews.comments,
       TO_CHAR(places_reviews.created_at,'YYYY-MM-DD' ) as created_at,
       TO_CHAR(places_reviews.updated_at, 'YYYY-MM-DD' ) as updated_at,
       users.name from places_reviews
      inner join users on places_reviews.id_user = users.id
      limit 3
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}
