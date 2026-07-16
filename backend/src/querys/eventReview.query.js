import pool from "../config/db.js";

export async function createReview(review) {

    const sql = `
        INSERT INTO events_reviews
        (
            id_user,
            id_event,
            comments,
            score
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;

    const values = [
        review.id_user,
        review.id_event,
        review.comments,
        review.score
    ];

    const result = await pool.query(sql, values);

    return result.rows[0];
}

export async function getEventReviews(id_event) {

    const sql = `
        SELECT
            er.id,
            er.comments,
            er.score,
            er.created_at,
            u.name,
            u.last_name
        FROM events_reviews er
        INNER JOIN users u
            ON u.id = er.id_user
        WHERE er.id_event = $1
        ORDER BY er.created_at DESC;
    `;

    const result = await pool.query(sql, [id_event]);

    return result.rows;

}