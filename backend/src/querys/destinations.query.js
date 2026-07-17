import pool from "../config/db.js";

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
   const lastIdSql = `
      SELECT (MAX(id) + 1) AS next_id
      FROM places;
   `;

   const lastIdResult = await pool.query(lastIdSql);
   const nextId = lastIdResult.rows[0].next_id;

   const sql =`
   INSERT INTO places(
      id,
      name,
      description,
      address,
      image_main,
      is_active,
      id_category,
      id_user,
      is_featured,
      created_at,
      updated_at
   ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
   ) RETURNING *
   `;

   const values = [
      nextId,
      placeData.name,
      placeData.description,
      placeData.address,
      placeData.image_main || null,
      placeData.is_active,
      placeData.id_category,
      placeData.fk_places_user,
      placeData.is_featured || false
   ]

   const result = await pool.query(sql, values)
   return result.rows[0]
}
