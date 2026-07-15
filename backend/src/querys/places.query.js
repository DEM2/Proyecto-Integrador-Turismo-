import pool from "../config/db.js";

// Busca lugares registrados en Barranquilla Explora
export async function searchPlaces({
    search = null,
    category = null,
    limit = 5
}) {

    const conditions = [
        "p.is_active = true"
    ];

    const values = [];

    // Buscar por nombre, descripción o dirección
    if (search) {

        values.push(`%${search}%`);

        const position = values.length;

        conditions.push(`
            (
                p.name ILIKE $${position}
                OR p.description ILIKE $${position}
                OR p.address ILIKE $${position}
            )
        `);
    }

    // Filtrar por categoría
    if (category) {

        values.push(category);

        const position = values.length;

        conditions.push(`
            c.name = $${position}
        `);
    }

    // Evitamos que la IA solicite demasiados registros
    const safeLimit = Math.min(
        Math.max(Number(limit) || 5, 1),
        10
    );

    values.push(safeLimit);

    const limitPosition = values.length;

    const sql = `
        SELECT
            p.id,
            p.name,
            p.description,
            p.address,
            p.image_main,
            p.is_featured,
            c.name AS category_name
        FROM places p
        INNER JOIN categories c
            ON p.id_category = c.id
        WHERE ${conditions.join(" AND ")}
        ORDER BY
            p.is_featured DESC,
            p.name ASC
        LIMIT $${limitPosition};
    `;

    const result = await pool.query(sql, values);

    return result.rows;
}