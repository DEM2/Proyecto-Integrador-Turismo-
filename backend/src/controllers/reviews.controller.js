import { countReviewsByUserOrganizador, getReviewsByUserOrganizador } from "../querys/perfilOrganizador.js";
import { getReviewsByUser } from "../querys/reviews.query.js";

export async function getReviewsController(req, res) {
    try {
        const { id } = req.params;

        const reviews = await getReviewsByUser(id)

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


export async function getReviewsControllerOrganizador(req, res) {
    try {
        const { id } = req.params;

        const reviews = await getReviewsByUserOrganizador(id)

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

export async function countReviewsControllerOrganizador(req, res) {
    try {
        const { id } = req.params;

        const reviews = await countReviewsByUserOrganizador(id)

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