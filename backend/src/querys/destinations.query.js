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
      id_category,
      is_active,
      id_user) VALUES (
      $1, $2, $3, $4, $5, $6 
   ) RETURNING *
   `;

   const values = [
      placeData.name,
      placeData.description,
      placeData.address,
      placeData.id_category,
      placeData.is_active,
      placeData.fk_places_user
   ]

   const result = await pool.query(sql, values)

   return result.rows[0]
}
