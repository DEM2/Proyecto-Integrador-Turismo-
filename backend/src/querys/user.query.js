import pool from "../config/db.js";

export async function findByEmail(email){

    const sql = `
        SELECT *
        FROM users
        WHERE email = $1
    `;

    const values = [
        email
    ];

    const result = await pool.query(sql,values);

    return result.rows[0] || null;

}

export async function create(user){

    const sql = `

        INSERT INTO users
        (
            nombre,
            email,
            password
        )

        VALUES
        (
            $1,
            $2,
            $3
        )

        RETURNING *

    `;

    const values = [

        user.nombre,

        user.email,

        user.password

    ];

    const result = await pool.query(sql,values);

    return result.rows[0];

}