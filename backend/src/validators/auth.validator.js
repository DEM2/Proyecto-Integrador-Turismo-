import pool from "../config/db.js";

export async function validateRegister(req, res, next) {
    try {
        const coder = req.body;

        const result = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            [coder.email]
        );

        if (result.rows.length) {
            return res.status(409).json({ message: `el correo ${coder.email} ya se encuentra registrado` });
        }

        next();
    } catch (error) {
        next(error);
    }
}
