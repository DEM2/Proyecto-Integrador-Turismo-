import {
    countEventsByUserOrganizador,
    countReviewsByUserOrganizador,
    countSitesByUserOrganizador,
    getReviewsByUserOrganizador,
} from "../querys/perfilOrganizador.query.js";
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



export async function getOrganizerProfileController(req, res) {
    try {
        const { id } = req.params;

        const [reviews, reviewCount, sitesCount, eventsCount] = await Promise.all([
            getReviewsByUserOrganizador(id),
            countReviewsByUserOrganizador(id),
            countSitesByUserOrganizador(id),
            countEventsByUserOrganizador(id),
        ]);

        res.status(200).json({
            ok: true,
            message: "Perfil del organizador consultado exitosamente",
            data: {
                reviews: reviews ?? [],
                counts: {
                    reviews: reviewCount?.[0]?.total_reviews ?? 0,
                    sites: sitesCount?.[0]?.total_sites ?? 0,
                    events: eventsCount?.[0]?.total_events ?? 0,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor"
        })
    }
}
