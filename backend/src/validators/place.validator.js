


export function validateCreateDestination(req, res, next) {
    const {
        name, address, id_category, fk_places_user
    } = req.body


    if (!name || !address || !id_category || !fk_places_user) {
        return res.status(400).json({
            ok: false,
            message: "name, address, categoria y id_user son obligatorios"
        });
    }

    if (typeof name !== "string" || name.trim().length < 3) {
        return res.status(400).json({
            ok: false,
            message: "El nombre debe tener minimo 3 caracteres"
        })
    }

    if (typeof address !== "string" || address.trim().length < 5) {
        return res.status(400).json({
            ok: false,
            message: "La dirección debe tener minimo 5 caracteres"
        })
    }

    if (Number.isNaN(id_category) || Number(id_category) <= 0) {
        return res.status(400).json({
            ok: false,
            message: "El id de la categoría no es válido",
        });
    }
    next();
}