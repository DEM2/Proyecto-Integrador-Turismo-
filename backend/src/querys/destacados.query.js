
import pool from "../config/db.js";

export async function obtenerSitiosDestacadosQ(){

    const sql = `
        SELECT p.name as place, p.description, p.address , c.name as category
        FROM places p
        join categories c on c.id = p.id_category
        WHERE p.is_featured = true
        LIMIT 3

    `;

    const result = await pool.query(sql);

    return result.rows;

}

export async function obtenerEventosDestacadosQ(){
    
    const sql = `
        SELECT
        e.id,
        e.name,
        e.description,
        e.address,
        e.start_date,
        e.end_date,
        e.start_time,
        e.price,
        e.image_main,
        c.name AS category
    FROM events e
    INNER JOIN categories c
    ON e.id_category = c.id
    WHERE e.is_featured = TRUE
    LIMIT 3;
    `;

    const result = await pool.query(sql);

    return result.rows;

}