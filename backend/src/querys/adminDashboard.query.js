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
    FROM users
    INNER JOIN roles
      ON roles.id = users.id_role
    WHERE LOWER(roles.name) = 'organizador'
      AND users.is_active = false;
  `;

  const result = await pool.query(sql);
  return result.rows[0] || null;
}

export async function getAdminDashboardPendingOrganizers() {
  const sql = `
    SELECT
      users.id,
      users.name,
      users.last_name,
      users.email,
      TO_CHAR(users.created_at, 'DD/MM/YYYY') AS requested_at
    FROM users
    INNER JOIN roles
      ON roles.id = users.id_role
    WHERE LOWER(roles.name) = 'organizador'
      AND users.is_active = false
    ORDER BY users.created_at DESC
    LIMIT 6;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardAllPendingOrganizers() {
  const sql = `
    SELECT
      users.id,
      users.name,
      users.last_name,
      users.email,
      TO_CHAR(users.created_at, 'DD/MM/YYYY') AS requested_at
    FROM users
    INNER JOIN roles
      ON roles.id = users.id_role
    WHERE LOWER(roles.name) = 'organizador'
      AND users.is_active = false
    ORDER BY users.created_at DESC;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function approveAdminDashboardOrganizer(id_user) {
  const sql = `
    UPDATE users
    SET is_active = true
    FROM roles
    WHERE users.id = $1
      AND roles.id = users.id_role
      AND LOWER(roles.name) = 'organizador'
      AND users.is_active = false
    RETURNING users.id;
  `;

  const result = await pool.query(sql, [id_user]);
  return result.rows[0] || null;
}

export async function rejectAdminDashboardOrganizer(id_user) {
  const sql = `
    DELETE FROM users
    USING roles
    WHERE users.id = $1
      AND roles.id = users.id_role
      AND LOWER(roles.name) = 'organizador'
      AND users.is_active = false
    RETURNING users.id;
  `;

  const result = await pool.query(sql, [id_user]);
  return result.rows[0] || null;
}

export async function getAdminDashboardRecentReviews() {
  const sql = `
    SELECT
      events_reviews.id AS id_review,
      'event' AS review_type,
      events_reviews.comments,
      TO_CHAR(events_reviews.created_at, 'YYYY-MM-DD') AS created_at,
      TO_CHAR(events_reviews.updated_at, 'YYYY-MM-DD') AS updated_at,
      users.name AS user_name,
      events.name AS reviewed_item_name
    FROM events_reviews
    INNER JOIN events
      ON events_reviews.id_event = events.id
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
      users.name AS user_name,
      places.name AS reviewed_item_name
    FROM places_reviews
    INNER JOIN places
      ON places.id = places_reviews.id_place
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
      users.name AS user_name,
      events.name AS reviewed_item_name
    FROM events_reviews
    INNER JOIN events
      ON events_reviews.id_event = events.id
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
      users.name AS user_name,
      places.name AS reviewed_item_name
    FROM places_reviews
    INNER JOIN places
      ON places.id = places_reviews.id_place
    INNER JOIN users
      ON places_reviews.id_user = users.id

    ORDER BY created_at DESC;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardAllEvents() {
  const sql = `
   select events.id,
       events.name AS event_name,
       events.description,
       TO_CHAR(events.start_date, 'YYYY-MM-DD') as start_date,
       TO_CHAR(events.created_at, 'YYYY-MM-DD') as created_at,
       TO_CHAR(events.updated_at, 'YYYY-MM-DD') as updated_at,
       events.price,
       events.address,
       events.image_main,
       events.is_featured,
       events.is_active,

       categories.name AS category_name,
       users.name AS user_name
from events
inner join categories on events.id_category = categories.id
inner join users on events.id_user = users.id
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardAllPlaces() {
  const sql = `
    select places.id,
places.name AS place_name,
places.description,
places.address,
places.is_featured, places.is_active,
categories.name AS category_name,
users.name AS user_name
from places
inner join categories on places.id_category = categories.id
inner join users on places.id_user = users.id
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardAllUsers() {
  const sql = `
    
        select users.id,users.name,users.last_name,users.email,
       users.is_active,
       roles.id AS id_role,
       roles.name AS role_name
from users
inner join roles on users.id_role = roles.id
    
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function getAdminDashboardRoles() {
  const sql = `
    SELECT
      roles.id,
      roles.name
    FROM roles
    ORDER BY roles.name ASC;
  `;

  const result = await pool.query(sql);
  return result.rows || [];
}

export async function updateAdminDashboardEvent(id_event, eventData) {
  const sql = `
    UPDATE events
    SET
      name = $1,
      description = $2,
      start_date = $3,
      price = $4,
      address = $5,
      image_main = $6,
      is_featured = $7,
      is_active = $8,
      updated_at = NOW()
    WHERE id = $9
    RETURNING id;
  `;

  const values = [
    eventData.name,
    eventData.description,
    eventData.start_date,
    eventData.price,
    eventData.address,
    eventData.image_main,
    eventData.is_featured,
    eventData.is_active,
    id_event
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

export async function updateAdminDashboardPlace(id_place, placeData) {
  const sql = `
    UPDATE places
    SET
      name = $1,
      description = $2,
      address = $3,
      is_featured = $4,
      is_active = $5
    WHERE id = $6
    RETURNING id;
  `;

  const values = [
    placeData.name,
    placeData.description,
    placeData.address,
    placeData.is_featured,
    placeData.is_active,
    id_place
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
}

export async function updateAdminDashboardUser(id_user, userData) {
  const sql = `
    UPDATE users
    SET
      name = $1,
      last_name = $2,
      email = $3,
      is_active = $4,
      id_role = $5
    WHERE id = $6
    RETURNING id;
  `;

  const values = [
    userData.name,
    userData.last_name,
    userData.email,
    userData.is_active,
    userData.id_role,
    id_user
  ];

  const result = await pool.query(sql, values);
  return result.rows[0] || null;
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
