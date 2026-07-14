
export async function validateCreateEvent(req, res, next) {
    
    const {name, start_date, id_user, id_category} = req.body

    if(typeof name !== "string"){
        return res.status(400).json({
            ok: false,
            message: "El nombre no debe incluir numero"
        })
    }

    if(name.trim().length < 3){
        return res.status(400).json({
            ok: false,
            message: "El nombre debe ser minimo 3 caracteres"
        })
    }

    if(!name || !start_date || !id_user|| !id_category){
        return res.status(400).json({
            ok: false,
            message: "name, start_date, id_user, id_category información obligatoria "
        })
    }

    next();
}