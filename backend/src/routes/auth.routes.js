import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import {validateLogin, validateRegister} from "../validators/auth.validator.js";
import { obtenerEventosDestacados, obtenerSitiosDestacados } from "../controllers/destacados.controller.js";
import { destinations } from "../controllers/destinations.controller.js";
import { getEventController } from "../controllers/event.controller.js";
import { getReviewsByUser } from "../querys/reviews.query.js";
import { countReviewsControllerOrganizador, getReviewsController, getReviewsControllerOrganizador } from "../controllers/reviews.controller.js";
import { authMiddleware } from "../../../frontend/src/middleware/routeGuards.js";
import { addEventToItinerary, addPlaceToItinerary, createItinerary, getUserItineraries } from "../controllers/itinerary.controller.js";

const router = Router();

/*
    POST /api/auth/register
*/

// REGISTER
router.post(
    "/register",
    validateRegister,
    register
);

//LOGIN
router.post(
    "/login",
    validateLogin,
    login
)

//EVENTS

router.get(
    "/events/:id_event",
    getEventController
)


router.get(
    "/destacados/sitios",
    obtenerSitiosDestacados
);

router.get(
    "/destacados/eventos",
    obtenerEventosDestacados
);

router.get(
    "/destinations",
    destinations
); 

//REVIEWS

router.get(
    "/reviews/:id",
    getReviewsController
);
router.get(
    "/reviewsorganizador/:id",
    getReviewsControllerOrganizador
);
router.get(
    "/countreviewsorganizador/:id",
    countReviewsControllerOrganizador
);


//ITINERARIES

router.get(
    "/itineraries/:id",
    getUserItineraries
);

router.post(
    "/itineraries",
    createItinerary
);

router.post(
    "/itineraries/:id/places",
    authMiddleware,
    addPlaceToItinerary
);

router.post(
    "/itineraries/:id/events",
    authMiddleware,
    addEventToItinerary
);

export default router;