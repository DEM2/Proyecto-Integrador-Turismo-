import pool from "../config/db.js";

 //Validamos que el correo no esté registrado en nuestra db
export async function validateRegister(req, res, next) {
    try {
        const user = req.body;
       
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`,
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

//Validamos que el correo esté registrado en nuestra db
export async function validateLogin(req, res, next) {
    
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            ok: false,
            message: "Email y password obligatorios"
        });
    }

    if(!email.includes("@")){
        return res.status(400).json({
            ok: false,
            message: "El email no tiene un formato valido."
        })
    }
    next();
}
