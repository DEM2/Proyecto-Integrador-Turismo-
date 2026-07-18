import pool from "../config/db.js";

export async function getCategories() {
   const sql = `
      SELECT id, name
      FROM categories
      ORDER BY name ASC
   `;

   const result = await pool.query(sql);
   return result.rows;
}

export async function getDestinations(){

   const sql = 
      `SELECT
          p.id, 
          p.name as place ,
          c.name as category,
          p.address as address
       FROM places p 
       JOIN categories c ON c.id = p.id_category`

   const result = await pool.query(sql);

  return result.rows
}

export async function createDestinationByUser(placeData) {

   const sql = `
    INSERT INTO places (
      name,
      description,
      address,
      id_category,
      id_user,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

   const values = [
      placeData.name,
      placeData.description || null,
      placeData.address,
      placeData.id_category,
      placeData.id_user,
      placeData.is_active
   ]

   const result = await pool.query(sql, values)
   return result.rows[0]
}

export async function getDestinationById(id_place) {
    const sql = `
        SELECT
            p.id,
            p.name,
            p.description,
            p.address,
            p.image_main,
            p.is_active,
            p.is_featured,
            p.id_category,
            p.id_user,
            c.name AS category
        FROM places p
        JOIN categories c ON c.id = p.id_category
        WHERE p.id = $1
          AND p.is_active = true
    `;

    const values = [id_place]

    const result = await pool.query(sql, values);

    return result.rows[0] || null;
}
