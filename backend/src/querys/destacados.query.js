
import pool from "../config/db.js";

export async function obtenerSitiosDestacadosQ(){

    const sql = `
        SELECT name, description, address
        FROM places
        WHERE featured = true
        LIMIT 3

    `;

    const result = await pool.query(sql);

    return result.rows;

}

export async function obtenerEventosDestacadosQ(){
    
    const sql = `
        SELECT
            id,
            name,
            description,
            location,
            address,
            start_date,
            end_date,
            start_time,
            price,
            image_main
        FROM events
        WHERE featured = TRUE
        LIMIT 3;
    `;

    const result = await pool.query(sql);

    return result.rows;

}