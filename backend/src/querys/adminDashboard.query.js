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
    SELECT
      comments,
      TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at,
      TO_CHAR(updated_at, 'YYYY-MM-DD') AS updated_at,
      name
    FROM (
      SELECT
        events_reviews.comments,
        events_reviews.created_at,
        events_reviews.updated_at,
        users.name
      FROM events_reviews
      INNER JOIN users
        ON events_reviews.id_user = users.id

      UNION ALL

      SELECT
        places_reviews.comments,
        places_reviews.created_at,
        places_reviews.updated_at,
        users.name
      FROM places_reviews
      INNER JOIN users
        ON places_reviews.id_user = users.id
    ) reviews
    ORDER BY created_at DESC
    LIMIT 3;
  `;
  

  const result = await pool.query(sql);
  return result.rows || [];
}
