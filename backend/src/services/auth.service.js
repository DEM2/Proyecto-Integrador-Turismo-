
import pool from "../config/db.js";
export async function register(userData) {

     const [result] = await pool.query(`insert into users (name, last_name, email, password,id_role, is_active)
                    values(?,?,?,?,?,?)`, [userData.name, userData.last_name, userData.email, userData.password, 1, 1]);


    // Aquí después iría bcrypt

    // Aquí después iría JWT


    return result;

}