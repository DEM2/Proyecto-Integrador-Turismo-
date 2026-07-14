import pool from "../config/db.js";

export async function getReviewsByUser(id_user) {
    const sql = `
            SELECT
            'event' AS review_type,
            ev.name AS target_name,
            e.comments,
            e.score,
            e.created_at
        FROM events_reviews e
        INNER JOIN events ev
            ON ev.id = e.id_event
        WHERE e.id_user = $1

        UNION ALL

        SELECT
            'place' AS review_type,
            pl.name AS target_name,
            p.comments,
            p.score,
            p.created_at
        FROM places_reviews p
        INNER JOIN places pl
            ON pl.id = p.id_place
        WHERE p.id_user = $1

        ORDER BY created_at DESC;
    `
    const values = [
        id_user
    ];

    const result = await pool.query(sql, values);

    return result.rows || null
}