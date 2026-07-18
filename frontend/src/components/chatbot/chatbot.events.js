// Servicio encargado de enviar mensajes al backend.
import { getMessageFromAi } from "../../services/chat.service.js";
// Funciones que modifican la interfaz del chatbot.
import { addBotMessage,addUserMessage, removeTypingIndicator, resetChatUI, scrollToBottom, showTypingIndicator, updateSendButton } from "./chatbot.ui.js";


// Guarda temporalmente la conversación mientras la página esté abierta.
let conversationHistory = [];
// Evita que se envíen varios mensajes mientras la IA responde.
let isChatbotLocked = false;

// Espera una cantidad específica de milisegundos.
function delay(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Abre el modal del chatbot.
function openChat() {
    const button = document.getElementById("chatbot-button");
    const modal = document.getElementById("chatbot-modal");

    button.addEventListener("click", () => {
        modal.classList.remove("hidden");
        button.classList.add("hidden");
        button.setAttribute("aria-expanded", "true");
    });
}

// Cierra el chatbot y elimina la conversación.
function closeChat() {
    const closeButton = document.getElementById("chatbot-close");
    const modal = document.getElementById("chatbot-modal");
    const button = document.getElementById("chatbot-button");

    closeButton.addEventListener("click", () => {
        // No permite cerrar mientras la IA está respondiendo.
        if (isChatbotLocked) return;

        modal.classList.add("hidden");
        button.classList.remove("hidden");
        button.setAttribute("aria-expanded", "false");

        // Borra la memoria conversacional.
        conversationHistory = [];

        // Reinicia los mensajes visibles.
        resetChatUI();

        // Activa nuevamente los eventos de las tarjetas creadas al reiniciar.
        setupQuickCards();
    });
}


// Minimiza el chatbot sin borrar la conversación.
function minimizeChat() {
    const minimizeButton = document.getElementById("chatbot-minimize");
    const modal = document.getElementById("chatbot-modal");
    const button = document.getElementById("chatbot-button");

    minimizeButton.addEventListener("click", () => {
        modal.classList.add("hidden");
        button.classList.remove("hidden");
        button.setAttribute("aria-expanded", "false");
    });
}

// Cambia el color y estado del botón según el contenido del textarea.
function toggleSendButton() {
    const input = document.getElementById("chatbot-input");

    input.addEventListener("input", () => {
        updateSendButton(input.value.trim().length > 0);
    });
}

// Enter envía el mensaje y Shift + Enter crea una nueva línea.
function handleInputKeyboard() {
    const input = document.getElementById("chatbot-input");

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            document.getElementById("chatbot-form").requestSubmit();
        }
    });
}

// Gestiona el envío de mensajes al backend y la memoria conversacional.
function sendMessage() {
    const form = document.getElementById("chatbot-form");
    const input = document.getElementById("chatbot-input");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Evita envíos duplicados mientras el chatbot está bloqueado.
        if (isChatbotLocked) return;

        const message = input.value.trim();

        // No envía mensajes vacíos.
        if (message === "") return;

        isChatbotLocked = true;

        // Copia solamente la conversación anterior.
        // El mensaje actual será enviado aparte al backend.
        const previousHistory = [...conversationHistory];

        // Muestra y guarda el mensaje actual del usuario.
        addUserMessage(message);
        conversationHistory.push({ role: "user", content: message });

        // Limpia y bloquea el textarea.
        input.value = "";
        input.disabled = true;
        input.placeholder = "Espera unos segundos...";

        updateSendButton(false);
        showTypingIndicator();
        scrollToBottom();

        // Bloquea el siguiente envío durante mínimo cinco segundos.
        const cooldown = delay(5000);

        try {
            // Envía el mensaje actual junto con el historial anterior.
            const response = await getMessageFromAi(message, previousHistory);
            const botReply = response?.data?.reply;

            // Valida que el backend haya devuelto una respuesta.
            if (!botReply) {
                throw new Error("La IA no devolvió una respuesta válida.");
            }

            removeTypingIndicator();

            // Guarda y muestra la respuesta de la IA.
            conversationHistory.push({ role: "assistant", content: botReply });
            addBotMessage(botReply);
        } catch (error) {
            console.error("Error al obtener la respuesta:", error);

            removeTypingIndicator();

            // Si la petición falla, elimina el último mensaje del historial.
            const lastMessage = conversationHistory.at(-1);

            if (lastMessage?.role === "user" && lastMessage?.content === message) {
                conversationHistory.pop();
            }

            addBotMessage("Lo siento, ocurrió un error al responder.");
        } finally {
            // Espera hasta completar los cinco segundos mínimos.
            await cooldown;

            // Desbloquea nuevamente el chatbot.
            isChatbotLocked = false;
            input.disabled = false;
            input.placeholder = "Escribe un mensaje...";

            updateSendButton(input.value.trim().length > 0);

            input.focus();
            scrollToBottom();
        }
    });
}

// Configura las preguntas que se envían mediante las tarjetas rápidas.
function setupQuickCards() {
    const input = document.getElementById("chatbot-input");
    const form = document.getElementById("chatbot-form");

    // Mensaje asociado a cada tarjeta.
    const quickMessages = {
        "card-lugares": "¿Qué lugares turísticos me recomiendas conocer en Barranquilla?",
        "card-restaurantes": "¿Qué restaurantes me recomiendas en Barranquilla?",
        "card-itinerarios": "Ayúdame a encontrar un itinerario disponible en Barranquilla.",
        "card-eventos": "¿Qué eventos hay disponibles en Barranquilla?"
    };

    Object.entries(quickMessages).forEach(([cardId, message]) => {
        const card = document.getElementById(cardId);

        // Evita errores si alguna tarjeta no existe.
        if (!card) return;

        card.addEventListener("click", () => {
            // No permite usar tarjetas mientras responde la IA.
            if (isChatbotLocked) return;

            // Coloca el mensaje asociado y envía el formulario.
            input.value = message;
            updateSendButton(true);
            form.requestSubmit();
        });
    });
}

// Inicializa todos los eventos cuando el chatbot ya está renderizado.
export function chatbotEvents() {
    openChat();
    closeChat();
    minimizeChat();
    toggleSendButton();
    handleInputKeyboard();
    sendMessage();
    setupQuickCards();
}