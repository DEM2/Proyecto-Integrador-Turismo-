import pool from "../config/db.js";

const CURRENT_DATE_BOGOTA = `
    (CURRENT_TIMESTAMP AT TIME ZONE 'America/Bogota')::date
`;

// Busca itinerarios registrados para uso del asistente de IA.
export async function searchItineraries({
    search = null,
    date_filter = "upcoming",
    date_from = null,
    date_to = null,
    limit = 5
}) {
    const conditions = [
        "i.is_active = true"
    ];

    const values = [];

    // Buscar por el nombre del itinerario.
    if (search) {
        values.push(`%${search.trim()}%`);
        const position = values.length;

        conditions.push(`
            i.name ILIKE $${position}
        `);
    }

    // Filtrar por fechas.
    switch (date_filter) {
        case "today":
            conditions.push(`
                ${CURRENT_DATE_BOGOTA}
                BETWEEN i.start_date AND i.closing_date
            `);
            break;

        case "next_week":
            conditions.push(`
                i.start_date <= ${CURRENT_DATE_BOGOTA} + 13
                AND i.closing_date >= ${CURRENT_DATE_BOGOTA} + 7
            `);
            break;

        case "date_range": {
            if (!date_from || !date_to) {
                const error = new Error(
                    "date_from y date_to son obligatorios para buscar por rango."
                );

                error.statusCode = 400;
                error.code = "INVALID_ITINERARY_DATE_RANGE";

                throw error;
            }

            values.push(date_from);
            const dateFromPosition = values.length;

            values.push(date_to);
            const dateToPosition = values.length;

            conditions.push(`
                i.start_date <= $${dateToPosition}::date
                AND i.closing_date >= $${dateFromPosition}::date
            `);

            break;
        }

        case "all":
            // No se agrega ningún filtro temporal.
            break;

        case "upcoming":
        default:
            conditions.push(`
                i.closing_date >= ${CURRENT_DATE_BOGOTA}
            `);
            break;
    }

    const safeLimit = Math.min(
        Math.max(Number(limit) || 5, 1),
        10
    );

    values.push(safeLimit);
    const limitPosition = values.length;

    const sql = `
        SELECT
            i.id,
            i.name,
            i.start_date,
            i.closing_date,

            CASE
                WHEN ${CURRENT_DATE_BOGOTA}
                    BETWEEN i.start_date AND i.closing_date
                    THEN 'active_today'

                WHEN i.start_date > ${CURRENT_DATE_BOGOTA}
                    THEN 'upcoming'

                ELSE 'finished'
            END AS status,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'position', ip.position,
                            'id', p.id,
                            'name', p.name,
                            'description', p.description,
                            'address', p.address,
                            'category', c.name
                        )
                        ORDER BY ip.position
                    )
                    FROM itinerary_places ip
                    INNER JOIN places p
                        ON p.id = ip.id_place
                    INNER JOIN categories c
                        ON c.id = p.id_category
                    WHERE ip.id_itinerary = i.id
                    AND p.is_active = true
                ),
                '[]'::json
            ) AS places,

            COALESCE(
                (
                    SELECT json_agg(
                        json_build_object(
                            'position', ie.position,
                            'id', e.id,
                            'name', e.name,
                            'description', e.description,
                            'start_date', e.start_date,
                            'end_date', e.end_date,
                            'start_time', e.start_time,
                            'price', e.price,
                            'address', e.address
                        )
                        ORDER BY ie.position
                    )
                    FROM itinerary_events ie
                    INNER JOIN events e
                        ON e.id = ie.id_event
                    WHERE ie.id_itinerary = i.id
                    AND e.is_active = true
                ),
                '[]'::json
            ) AS events

        FROM itineraries i

        WHERE ${conditions.join(" AND ")}

        ORDER BY
            CASE
                WHEN ${CURRENT_DATE_BOGOTA}
                    BETWEEN i.start_date AND i.closing_date
                    THEN 1

                WHEN i.start_date > ${CURRENT_DATE_BOGOTA}
                    THEN 2

                ELSE 3
            END,
            i.start_date ASC

        LIMIT $${limitPosition};
    `;

    const result = await pool.query(sql, values);

    return result.rows;
}

// Devuelve la fecha usada por PostgreSQL para las comparaciones.
export async function getCurrentBogotaDate() {
    const sql = `
        SELECT
            ${CURRENT_DATE_BOGOTA} AS current_date;
    `;

    const result = await pool.query(sql);

    return result.rows[0].current_date;
}