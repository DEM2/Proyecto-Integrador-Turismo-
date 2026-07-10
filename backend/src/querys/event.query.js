import pool from "../config/db.js"

//Consulta para eventos

export async function getEventById(id_event) {

    const sql = `
        SELECT e.id,
            e.name,
            e.id_category,
            e.location,
            e.description,
            e.start_date,
            e.end_date,
            e.start_time,
            e.price,
            e.address,
            e.image_main,
            c.name AS category_name
            FROM events e
            INNER JOIN categories c
            ON e.id_category = c.id WHERE e.id = $1;
    `
    const values = [
        id_event
    ]

    const result = await pool.query(sql, values);
    //La consulta devuelve un objeto completo con varias propeidades, entonces
    //la información real de la db esta dentro de result.rows, por lo general es una lista
    //con una sola posición
    return result.rows[0] || null;

};

export async function getEventAgendaById(id_event) {

    const sql = `
        SELECT * FROM events_agenda
        WHERE id_event = $1;
    `
    const values = [
        id_event
    ]

    const result = await pool.query(sql, values);

    return result.rows || null
};