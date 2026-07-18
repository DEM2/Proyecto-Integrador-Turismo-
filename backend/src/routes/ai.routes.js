import { Router } from "express";
import { chatWithAI } from "../controllers/ai.controllers.js";

const router = Router();

/*
    POST /api/ai/chat
*/
router.post("/chat", chatWithAI);

export default router;