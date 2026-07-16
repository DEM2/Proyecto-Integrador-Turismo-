import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import {validateLogin, validateRegister} from "../validators/auth.validator.js";
import { obtenerEventosDestacados, obtenerSitiosDestacados } from "../controllers/destacados.controller.js";
import { destinations } from "../controllers/destinations.controller.js";
import { createEventController, getEventController } from "../controllers/event.controller.js";
import { validateCreateEvent } from "../validators/event.validator.js";
import { getReviewsByUser } from "../querys/reviews.query.js";
import { countReviewsControllerOrganizador, getOrganizerProfileController, getReviewsController, getReviewsControllerOrganizador } from "../controllers/reviews.controller.js";
import { authMiddleware } from "../../../frontend/src/middleware/routeGuards.js";
import { addEventToItinerary, addPlaceToItinerary, createItinerary, deleteItinerary, getItineraryById, getUserItineraries } from "../controllers/itinerary.controller.js";
import { getSitesController } from "../controllers/sitesprofile.controller.js";
import { getEventsController } from "../controllers/eventsprofile.controller.js";
import {
    saveEventReviewController,
    getEventReviewsController
} from "../controllers/eventReview.controller.js";

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

//Create events

router.post(
    "/organizer/createEvent",
    validateCreateEvent,
    createEventController
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
//Sites and Events and more
router.get(
    "/organizer-profile/:id",
    getOrganizerProfileController
);

//


//ITINERARIES

router.get(
    "/itineraries/:id",
    getUserItineraries
);

router.get(
    "/itineraries/:id/itinerary",
    getItineraryById
);

router.post(
    "/itineraries",
    createItinerary
);

router.post(
    "/itineraries/:id/places",
    addPlaceToItinerary
);

router.post(
    "/itineraries/:id/events",
    addEventToItinerary
);

router.delete(
    "/itineraries/:id",
    deleteItinerary
)

// Eventos
router.post(
    "/events/:id_event/reviews",
    saveEventReviewController
);
router.get(
    "/events/:id_event/reviews",
    getEventReviewsController
);

export default router;