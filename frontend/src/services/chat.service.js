import { apiUrl } from "./apiConfig.js";

export async function getMessageFromAi(message, history = []) {
    const response = await fetch(apiUrl("/api/ai/chat"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message, history})
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error( error?.error?.message || error?.message || "Error al obtener la respuesta del chatbot");
    }

    return await response.json();
}
