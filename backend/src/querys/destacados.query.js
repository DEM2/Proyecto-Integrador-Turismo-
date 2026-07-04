
import pool from "../config/db.js";

export async function obtenerSitiosDestacadosQ(){

    const sql = `
        SELECT *
        FROM places
        WHERE featured = true
        LIMIT 3

    `;

    const result = await pool.query(sql);

    return result.rows;

}

export async function obtenerEventosDestacadosQ(){
    
    const sql = `
        SELECT *
        FROM events
        WHERE featured = true
        LIMIT 3
    `;

    const result = await pool.query(sql);

    return result.rows;

}