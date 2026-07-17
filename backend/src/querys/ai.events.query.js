import pool from "../config/db.js";

const CURRENT_DATE_BOGOTA = `
    (CURRENT_TIMESTAMP AT TIME ZONE 'America/Bogota')::date
`;

const CURRENT_TIME_BOGOTA = `
    (CURRENT_TIMESTAMP AT TIME ZONE 'America/Bogota')::time
`;


// Busca eventos para uso exclusivo del asistente de IA.
export async function searchEvents({
    search = null,
    category = null,
    date_filter = "upcoming",
    date_from = null,
    date_to = null,
    free_only = false,
    max_price = null,
    limit = 5
}) {
    const conditions = [
        "e.is_active = true"
    ];

    const values = [];


    // Busca por nombre, descripción o dirección.
    if (search) {
        values.push(`%${search.trim()}%`);
        const position = values.length;

        conditions.push(`
            (
                e.name ILIKE $${position}
                OR e.description ILIKE $${position}
                OR e.address ILIKE $${position}
            )
        `);
    }


    // Filtra por nombre de categoría.
    if (category) {
        values.push(category.trim());
        const position = values.length;

        conditions.push(`
            c.name ILIKE $${position}
        `);
    }


    // Filtra los eventos según el periodo solicitado.
    switch (date_filter) {
        case "today":
            conditions.push(`
                e.start_date <= ${CURRENT_DATE_BOGOTA}
                AND e.end_date >= ${CURRENT_DATE_BOGOTA}
            `);
            break;


        case "started_today":
            conditions.push(`
                e.start_date <= ${CURRENT_DATE_BOGOTA}
                AND e.end_date >= ${CURRENT_DATE_BOGOTA}
                AND e.start_time <= ${CURRENT_TIME_BOGOTA}
            `);
            break;


        case "this_weekend":
            /*
             * ISO DOW:
             * lunes = 1
             * sábado = 6
             * domingo = 7
             */
            conditions.push(`
                e.start_date <= (
                    ${CURRENT_DATE_BOGOTA}
                    + (7 - EXTRACT(ISODOW FROM ${CURRENT_DATE_BOGOTA}))::integer
                )
                AND e.end_date >= (
                    ${CURRENT_DATE_BOGOTA}
                    + (6 - EXTRACT(ISODOW FROM ${CURRENT_DATE_BOGOTA}))::integer
                )
            `);
            break;


        case "date_range":
            if (!date_from || !date_to) {
                const error = new Error(
                    "date_from y date_to son obligatorios para buscar por rango."
                );

                error.statusCode = 400;
                error.code = "INVALID_EVENT_DATE_RANGE";

                throw error;
            }

            values.push(date_from);
            const dateFromPosition = values.length;

            values.push(date_to);
            const dateToPosition = values.length;

            conditions.push(`
                e.start_date <= $${dateToPosition}::date
                AND e.end_date >= $${dateFromPosition}::date
            `);
            break;


        case "all":
            // No se agrega ningún filtro de fecha.
            break;


        case "upcoming":
        default:
            conditions.push(`
                e.end_date >= ${CURRENT_DATE_BOGOTA}
            `);
            break;
    }


    // Busca solamente eventos gratuitos.
    if (free_only === true) {
        conditions.push(`
            e.price = 0
        `);
    }


    // Filtra por presupuesto máximo.
    if (max_price !== null && max_price !== undefined) {
        const parsedMaxPrice = Number(max_price);

        if (!Number.isNaN(parsedMaxPrice) && parsedMaxPrice >= 0) {
            values.push(parsedMaxPrice);
            const position = values.length;

            conditions.push(`
                e.price <= $${position}
            `);
        }
    }


    // Limitamos los resultados para controlar la cantidad de datos enviada a la IA.
    const safeLimit = Math.min(
        Math.max(Number(limit) || 5, 1),
        10
    );

    values.push(safeLimit);
    const limitPosition = values.length;


    const sql = `
        SELECT
            e.id,
            e.name,
            e.description,
            e.start_date,
            e.end_date,
            e.start_time,
            e.price,
            e.address,
            e.image_main,
            e.is_featured,
            c.name AS category_name,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'date', ea.activity_date,
                            'time', ea.activity_time,
                            'title', ea.title
                        )
                        ORDER BY
                            ea.activity_date ASC,
                            ea.activity_time ASC
                    )
                    FROM events_agenda ea
                    WHERE ea.id_event = e.id
                    AND ea.is_active = true
                ),
                '[]'::json
            ) AS agenda

        FROM events e

        INNER JOIN categories c
            ON c.id = e.id_category

        WHERE ${conditions.join(" AND ")}

        ORDER BY
            e.is_featured DESC,
            e.start_date ASC,
            e.start_time ASC

        LIMIT $${limitPosition};
    `;

    const result = await pool.query(sql, values);

    return result.rows;
}