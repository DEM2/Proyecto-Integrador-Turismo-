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
   const sql =`
   INSERT INTO places(
      name,
      description,
      address,
      image_main,
      is_active,
      id_category,
      id_user,
      is_featured
   ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8
   ) RETURNING *
   `;

   const values = [
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
