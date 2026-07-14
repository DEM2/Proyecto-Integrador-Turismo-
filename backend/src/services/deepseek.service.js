import { buildSystemPrompt } from "../prompts/tourism.prompt.js";
import { mapDeepSeekError } from "../utils/deepseek.error.js";

// URL del endpoint de DeepSeek para chat.
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";


// Esta función recibe el mensaje del usuario
// y se encarga de llamar a DeepSeek.
export async function askDeepSeek(message) {
    const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",

            // Aquí usamos la API key guardada en el .env.
            // Nunca debe ir en frontend.
            "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
            // Modelo que viene desde el .env
            model: process.env.DEEPSEEK_MODEL,

            // Desactivamos el modo pensamiento.
            // Para chatbot turístico nos conviene más:
            // respuestas rápidas, más baratas y menos cortadas.
            thinking: {
                type: "disabled"
            },
            // Conversación que mandamos a la IA.
            messages: [
                {
                    role: "system",
                    content: buildSystemPrompt()
                },
                {
                    role: "user",
                    content: message
                }
            ],

            // Mientras más alto, más creativa la respuesta.
            // 0.4 está bien para recomendaciones útiles sin tanta locura.
            temperature: 0.4,

            // Limite de tokens para la respuesta.
            max_tokens: 1200
        })
    });

    const data = await response.json().catch(() => null);

    // Si DeepSeek responde con error, lo convertimos en un error controlado.
    if (!response.ok) {
        const mappedError = mapDeepSeekError(response.status);

        const error = new Error(mappedError.message);
        error.statusCode = response.status;
        error.code = mappedError.code;
        error.deepseekResponse = data;

        throw error;
    }

    // Aquí sacamos el texto que respondió la IA.
    const aiMessage = data?.choices?.[0]?.message?.content;

    if (!aiMessage) {
        const error = new Error("La IA respondió vacío.");
        error.statusCode = 502;
        error.code = "EMPTY_AI_RESPONSE";
        throw error;
    }

    return {
        reply: aiMessage,
        usage: data?.usage || null,
        model: data?.model || process.env.DEEPSEEK_MODEL
    };
}