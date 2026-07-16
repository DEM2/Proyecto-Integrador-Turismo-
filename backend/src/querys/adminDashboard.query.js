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
      target_name,
      author,
      score,
      TO_CHAR(created_at, 'DD/MM/YYYY') AS review_date,
      image_main
    FROM (
      SELECT
        ev.name AS target_name,
        CONCAT_WS(' ', u.name, u.last_name) AS author,
        er.score,
        er.created_at,
        ev.image_main
      FROM events_reviews er
      INNER JOIN events ev
        ON ev.id = er.id_event
      INNER JOIN users u
        ON u.id = er.id_user

      UNION ALL

      SELECT
        p.name AS target_name,
        CONCAT_WS(' ', u.name, u.last_name) AS author,
        pr.score,
        pr.created_at,
        NULL AS image_main
      FROM places_reviews pr
      INNER JOIN places p
        ON p.id = pr.id_place
      INNER JOIN users u
        ON u.id = pr.id_user
    ) reviews
    ORDER BY created_at DESC
    LIMIT 3;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}
