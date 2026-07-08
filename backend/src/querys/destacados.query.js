
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
        SELECT name, description, address, start_date, end_date
        FROM events
        WHERE featured = true
        LIMIT 3
    `;

    const result = await pool.query(sql);

    return result.rows;

}