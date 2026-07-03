
import pool from "../config/db.js";
export async function register(userData) {

     const result = await pool.query(
        `INSERT INTO users (name, last_name, email, password, id_role, is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, last_name, email, id_role, is_active, created_at`,
        [userData.name, userData.last_name, userData.email, userData.password, 1, true]
     );


    // Aquí después iría bcrypt

    // Aquí después iría JWT


    return result.rows[0];

}
