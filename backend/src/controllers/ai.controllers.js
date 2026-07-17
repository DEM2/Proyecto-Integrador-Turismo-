import { askDeepSeek } from "../services/deepseek.service.js";

// Esta función se ejecuta cuando llaman:
// POST /api/ai/chat
export async function chatWithAI(req, res) {
    try {
        const { message, history = [] } = req.body;

        // Validamos que el mensaje exista.
        if (!message || message.trim() === "") {
            return res.status(400).json({
                ok: false,
                error: {
                    code: "EMPTY_MESSAGE",
                    message: "El mensaje no puede estar vacío."
                }
            });
        }

        // Evitamos mensajes demasiado largos.
        // Esto ayuda a controlar costos y errores.
        if (message.length > 2000) {
            return res.status(400).json({
                ok: false,
                error: {
                    code: "MESSAGE_TOO_LONG",
                    message: "El mensaje es demasiado largo."
                }
            });
        }
        if (!Array.isArray(history)) {
            return res.status(400).json({
                ok: false,
                error: {
                    code: "INVALID_HISTORY",
                    message:
                        "El historial debe ser un arreglo."
                }
            });
        }
        // Aquí llamamos al servicio de DeepSeek.
        const aiResponse = await askDeepSeek(message.trim(), history);

        // Respondemos al frontend.
        return res.status(200).json({
            ok: true,
            data: {
                reply: aiResponse.reply
            },
            usage: aiResponse.usage,
            model: aiResponse.model,
            debug: {
                usedTools: aiResponse.usedTools
            }
        });

    } catch (error) {
        console.error("AI_ERROR:", {
            code: error.code,
            message: error.message,
            statusCode: error.statusCode,
            deepseekResponse: error.deepseekResponse
        });

        return res.status(error.statusCode || 500).json({
            ok: false,
            error: {
                code: error.code || "INTERNAL_SERVER_ERROR",
                message: error.message || "Ocurrió un error con el chatbot."
            }
        });
    }
}