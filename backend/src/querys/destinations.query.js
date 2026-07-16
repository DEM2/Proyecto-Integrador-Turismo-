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