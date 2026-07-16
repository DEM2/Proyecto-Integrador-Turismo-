import { countEventsByUserOrganizador } from "../querys/perfilOrganizador.query.js";


export async function getEventsController(req, res) {
    try {
        const { id } = req.params;

        const reviews = await countEventsByUserOrganizador(id)

        if (!reviews) {
            res.status(404).json({
                ok: false,
                message: "reseñas no encontradas",
            })
            return
        }

        res.status(200).json({
            ok: true,
            message: "Consulta de reseñas exitosa",
            data: reviews,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor"
        })
    }
}