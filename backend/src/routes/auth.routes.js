import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import {validateLogin, validateRegister} from "../validators/auth.validator.js";
import { obtenerEventosDestacados, obtenerSitiosDestacados } from "../controllers/destacados.controller.js";
import { destinations } from "../controllers/destinations.controller.js";
import { getEventController } from "../controllers/event.controller.js";
import { getReviewsByUser } from "../querys/reviews.query.js";
import { getReviewsController } from "../controllers/reviews.controller.js";
import { authMiddleware } from "../../../frontend/src/middleware/routeGuards.js";
import { addEventToItinerary, addPlaceToItinerary, createItinerary, getUserItineraries } from "../controllers/itinerary.controller.js";
import { saveEventReviewController } from "../controllers/eventReview.controller.js";

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


//ITINERARIES

router.get(
    "/itineraries",
    authMiddleware,
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
// Eventos
router.post(
    "/events/:id_event/reviews",
    saveEventReviewController
);

export default router;