
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail } from "../querys/user.query.js";

export async function register(userData) {

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const result = await pool.query(
        `INSERT INTO users (name, last_name, email, password, id_role, is_active)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, name, last_name, email, id_role, is_active, created_at`,
        [userData.name, userData.last_name, userData.email, hashedPassword, 1, true]
    );


    return result.rows[0];

}

//Login
export async function loginUserService(credentials) {
    const { email, password } = credentials;
    const user = await findByEmail(email);
    if (!user) {
        const error = new Error("Credenciales invalidas.")
        error.statusCode = 401;
        throw error;
    }
    
    // Aquí después iría bcrypt 
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        const error = new Error("Credenciales invalidas.")
        error.statusCode = 401;
        throw error;
    }

    // Aquí después iría JWT
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    )
   
    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
      
    };
}
