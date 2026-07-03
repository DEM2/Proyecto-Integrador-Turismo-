import pool from "../config/db";

export function validateRegister(req, res, next) {

    
    const coder = req.body;


    const [coderExists] = await pool.query('select * from usuarios where email = ?', [coder.email]);

    if (coderExists.length) {
        return res.status(409).json({ message: `el correo ${coder.email} ya se encuentra registrado` });
    }
    next();
    const [result] = await pool.query(`insert into usuarios (nombre, apellido, email, edad, telefono, id_clan)
                    values(?,?,?,?,?,?)`, [coder.nombre, coder.apellido, coder.email, coder.edad, coder.telefono, coder.id_clan]);


    await pool.end();

    res.json({ message: 'se ha creado el coder exitosamente' });

    // Validaciones

    // if(...)

    // return res.status(...)

    next();

}