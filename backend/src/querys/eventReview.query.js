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