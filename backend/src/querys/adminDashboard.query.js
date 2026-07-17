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
      WHERE is_active = true
      UNION ALL
      SELECT id FROM places_reviews
      WHERE is_active = true
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
      events_reviews.id AS id_review,
      'event' AS review_type,
      events_reviews.comments,
      TO_CHAR(events_reviews.created_at, 'YYYY-MM-DD') AS created_at,
      TO_CHAR(events_reviews.updated_at, 'YYYY-MM-DD') AS updated_at,
      users.name
    FROM events_reviews
    INNER JOIN users
      ON events_reviews.id_user = users.id
    WHERE events_reviews.is_active = true

    UNION ALL

    SELECT
      places_reviews.id AS id_review,
      'place' AS review_type,
      places_reviews.comments,
      TO_CHAR(places_reviews.created_at, 'YYYY-MM-DD') AS created_at,
      TO_CHAR(places_reviews.updated_at, 'YYYY-MM-DD') AS updated_at,
      users.name
    FROM places_reviews
    INNER JOIN users
      ON places_reviews.id_user = users.id
    WHERE places_reviews.is_active = true

    ORDER BY created_at DESC
    LIMIT 6;
  `;
  

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardAllReviews() {
  const sql = `
    SELECT
      events_reviews.id AS id_review,
      'event' AS review_type,
      events_reviews.comments,
      events_reviews.is_active,
      TO_CHAR(events_reviews.created_at, 'YYYY-MM-DD') AS created_at,
      TO_CHAR(events_reviews.updated_at, 'YYYY-MM-DD') AS updated_at,
      users.name
    FROM events_reviews
    INNER JOIN users
      ON events_reviews.id_user = users.id

    UNION ALL

    SELECT
      places_reviews.id AS id_review,
      'place' AS review_type,
      places_reviews.comments,
      places_reviews.is_active,
      TO_CHAR(places_reviews.created_at, 'YYYY-MM-DD') AS created_at,
      TO_CHAR(places_reviews.updated_at, 'YYYY-MM-DD') AS updated_at,
      users.name
    FROM places_reviews
    INNER JOIN users
      ON places_reviews.id_user = users.id

    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function hideAdminDashboardEventReview(id_review) {
  const sql = `
    UPDATE events_reviews
    SET is_active = false
    WHERE id = $1
    RETURNING id;
  `;

  const values = [
    id_review
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

export async function hideAdminDashboardPlaceReview(id_review) {
  const sql = `
    UPDATE places_reviews
    SET is_active = false
    WHERE id = $1
    RETURNING id;
  `;

  const values = [
    id_review
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

export async function showAdminDashboardEventReview(id_review) {
  const sql = `
    UPDATE events_reviews
    SET is_active = true
    WHERE id = $1
    RETURNING id;
  `;

  const values = [
    id_review
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

export async function showAdminDashboardPlaceReview(id_review) {
  const sql = `
    UPDATE places_reviews
    SET is_active = true
    WHERE id = $1
    RETURNING id;
  `;

  const values = [
    id_review
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}
