import pool from "../config/db.js";

export async function findByEmail(email){

    const sql = `
        SELECT *
        FROM usuario
        WHERE email = $1
    `;

    const values = [
        email
    ];

    const result = await pool.query(sql,values);

    return result.rows[0];

}

export async function create(user){

    const sql = `

        INSERT INTO usuario
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