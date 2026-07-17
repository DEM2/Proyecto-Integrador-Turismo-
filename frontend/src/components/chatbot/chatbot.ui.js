// Librería para convertir las respuestas Markdown de la IA en HTML.
import { marked } from "marked";
// Librería para limpiar el HTML y evitar contenido malicioso.
import DOMPurify from "dompurify";
// Contenido inicial usado al reiniciar el chatbot.
import { initialChatContent } from "./chatbot.js";

// Activa o desactiva visualmente el botón de enviar.
export function updateSendButton(enabled) {
    const sendButton = document.getElementById("chatbot-send");

    if (enabled) {
        sendButton.classList.remove("bg-gray-300");
        sendButton.classList.add("bg-blue-950");
        sendButton.disabled = false;
    } else {
        sendButton.classList.remove("bg-blue-950");
        sendButton.classList.add("bg-gray-300");
        sendButton.disabled = true;
    }
}

// Mueve automáticamente el scroll hasta el último mensaje.
export function scrollToBottom() {
    const body = document.getElementById("chatbot-body");
    body.scrollTop = body.scrollHeight;
}

// Agrega visualmente un mensaje enviado por el usuario.
export function addUserMessage(message) {
    const messages = document.getElementById("chatbot-messages");
    const messageContainer = document.createElement("div");

    messageContainer.className = "flex justify-end items-start gap-3";

    // Se limpia el mensaje antes de insertarlo en el HTML.
    messageContainer.innerHTML = `
        <div class="bg-blue-950 text-white rounded-3xl rounded-tr-sm px-4 py-2 max-w-[280px] break-words shadow">
            ${DOMPurify.sanitize(message)}
        </div>

        <div class="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center shrink-0">👤</div>
    `;

    messages.appendChild(messageContainer);
}

// Agrega visualmente una respuesta del chatbot.
export function addBotMessage(message) {
    const messages = document.getElementById("chatbot-messages");
    const messageContainer = document.createElement("div");

    // Convierte Markdown a HTML y luego limpia el resultado.
    const htmlMessage = DOMPurify.sanitize(marked.parse(message), {
        USE_PROFILES: { html: true }
    });

    messageContainer.className = "flex items-start gap-3";

    messageContainer.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center shrink-0">🤖</div>

        <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] shadow-sm break-words">
            ${htmlMessage}
        </div>
    `;

    messages.appendChild(messageContainer);
}

// Muestra la animación de tres puntos mientras la IA responde.
export function showTypingIndicator() {
    const messages = document.getElementById("chatbot-messages");

    // Evita que aparezcan varios indicadores al mismo tiempo.
    if (document.getElementById("chatbot-typing-indicator")) return;

    const typingContainer = document.createElement("div");

    typingContainer.id = "chatbot-typing-indicator";
    typingContainer.className = "flex items-start gap-3";

    typingContainer.innerHTML = `
        <div class="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center shrink-0">🤖</div>

        <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-slate-500 animate-bounce"></span>
            <span class="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:150ms]"></span>
            <span class="w-2 h-2 rounded-full bg-slate-500 animate-bounce [animation-delay:300ms]"></span>
        </div>
    `;

    messages.appendChild(typingContainer);
    scrollToBottom();
}

// Elimina la animación cuando llega la respuesta.
export function removeTypingIndicator() {
    document.getElementById("chatbot-typing-indicator")?.remove();
}

// Reinicia únicamente la parte visual del chatbot.
export function resetChatUI() {
    const messages = document.getElementById("chatbot-messages");
    const input = document.getElementById("chatbot-input");

    // Vuelve a insertar el mensaje inicial y las tarjetas.
    messages.innerHTML = initialChatContent();

    // Reinicia el textarea.
    input.value = "";
    input.disabled = false;
    input.placeholder = "Escribe un mensaje...";

    removeTypingIndicator();
    updateSendButton(false);
    scrollToBottom();
}