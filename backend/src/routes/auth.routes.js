import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import {validateRegister} from "../validators/auth.validator.js";
import { obtenerEventosDestacados, obtenerSitiosDestacados } from "../controllers/destacados.controller.js";

const router = Router();

/*
    POST /api/auth/register
*/
router.post(
    "/register",
    validateRegister,
    register
);

router.get(
    "/destacados/sitios",
    obtenerSitiosDestacados
);

router.get(
    "/destacados/eventos",
    obtenerEventosDestacados
);

export default router;