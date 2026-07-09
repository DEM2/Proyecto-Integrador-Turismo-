import pool from "../config/db.js";

 //Validamos que el correo no esté registrado en nuestra db
export async function validateRegister(req, res, next) {
    try {
        const user = req.body;
       
        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [user.email]
        );
        
        if (result.rows.length) {
            return res.status(409).json({ message: `el correo ${user.email} ya se encuentra registrado` });
        }

        next();
    } catch (error) {
        next(error);
    }
}
