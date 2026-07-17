import { buildSystemPrompt } from "../prompts/tourism.prompt.js";
import { mapDeepSeekError } from "../utils/deepseek.error.js";
import { aiTools } from "../tools/ai.tools.js";
import { executeAiTool } from "../services/ai.tools.service.js";

const DEEPSEEK_API_URL =
    "https://api.deepseek.com/chat/completions";

const MAX_TOOL_ROUNDS = 3;

function getCurrentDateTime() {
    return new Intl.DateTimeFormat("es-CO", {
        timeZone: "America/Bogota",
        dateStyle: "full",
        timeStyle: "long"
    }).format(new Date());
}

// Suma el consumo de todas las llamadas realizadas a DeepSeek.
function mergeUsage(currentUsage, newUsage) {
    if (!newUsage) {
        return currentUsage;
    }

    const totalUsage = {
        ...(currentUsage || {})
    };

    for (const [key, value] of Object.entries(newUsage)) {
        if (typeof value === "number") {
            totalUsage[key] = (totalUsage[key] || 0) + value;
        }
    }

    return totalUsage;
}


// Realiza una petición individual a DeepSeek.
async function sendDeepSeekRequest(messages) {
    const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },

        body: JSON.stringify({
            model: process.env.DEEPSEEK_MODEL,

            thinking: {
                type: "disabled"
            },

            messages,

            // Herramientas disponibles para el modelo.
            tools: aiTools,

            // DeepSeek decide si necesita utilizar una herramienta.
            tool_choice: "auto",

            temperature: 0.4,
            max_tokens: 1200
        })
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const mappedError = mapDeepSeekError(response.status);

        const error = new Error(mappedError.message);
        error.statusCode = response.status;
        error.code = mappedError.code;
        error.deepseekResponse = data;

        throw error;
    }

    return data;
}


// Recibe el mensaje y administra las llamadas a herramientas.
export async function askDeepSeek(message, history = []) {
    const messages = [
        {
            role: "system",
            content: buildSystemPrompt(getCurrentDateTime())
        },
        ...history,
        {
            role: "user",
            content: message
        }
    ];

    let totalUsage = null;
    let usedTools = [];

    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
        const data = await sendDeepSeekRequest(messages);

        totalUsage = mergeUsage(
            totalUsage,
            data?.usage
        );

        const aiMessage =
            data?.choices?.[0]?.message;

        if (!aiMessage) {
            const error = new Error(
                "DeepSeek no devolvió un mensaje válido."
            );

            error.statusCode = 502;
            error.code = "INVALID_AI_RESPONSE";

            throw error;
        }

        const toolCalls = aiMessage.tool_calls || [];

        // Si no solicita herramientas, esta es la respuesta final.
        if (toolCalls.length === 0) {
            const reply = aiMessage.content?.trim();

            if (!reply) {
                const error = new Error(
                    "La IA respondió vacío."
                );

                error.statusCode = 502;
                error.code = "EMPTY_AI_RESPONSE";

                throw error;
            }

            return {
                reply,
                usage: totalUsage,
                model:
                    data?.model ||
                    process.env.DEEPSEEK_MODEL,
                usedTools
            };
        }

        // Es necesario conservar el mensaje que contiene tool_calls.
        messages.push(aiMessage);

        for (const toolCall of toolCalls) {
            const toolName = toolCall.function.name;

            console.log(
                `AI_TOOL_CALL: ${toolName}`,
                toolCall.function.arguments
            );

            const toolResult =
                await executeAiTool(toolCall);

            console.log(
                `AI_TOOL_RESULT: ${toolName}`,
                toolResult
            );

            usedTools.push(toolName);

            // Enviamos el resultado real a DeepSeek.
            messages.push({
                role: "tool",
                tool_call_id: toolCall.id,
                content: JSON.stringify(toolResult)
            });
        }
    }

    const error = new Error(
        "La IA excedió el número permitido de llamadas a herramientas."
    );

    error.statusCode = 502;
    error.code = "TOOL_LIMIT_EXCEEDED";

    throw error;
}