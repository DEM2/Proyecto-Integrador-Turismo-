import { marked } from "marked";
import DOMPurify from "dompurify";
import { initialChatContent, renderBotAvatar } from "./chatbot.js";

function formatCurrentTime() {
    return new Intl.DateTimeFormat("es-CO", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date());
}

function activateConversationMode() {
    const modal = document.getElementById("chatbot-modal");
    const messages = document.getElementById("chatbot-messages");

    document.getElementById("chatbot-initial-guidance")?.classList.add("hidden");
    document.getElementById("chatbot-initial-hint")?.classList.add("hidden");

    if (modal?.dataset.conversationStarted === "true") return;

    modal.dataset.conversationStarted = "true";

    const dateSeparator = document.createElement("div");
    dateSeparator.id = "chatbot-date-separator";
    dateSeparator.className = "self-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500";
    dateSeparator.textContent = "Hoy";
    messages.appendChild(dateSeparator);
}

export function updateSendButton(enabled) {
    const sendButton = document.getElementById("chatbot-send");

    if (!sendButton) return;

    sendButton.disabled = !enabled;
    sendButton.setAttribute("aria-disabled", String(!enabled));
}

export function resizeChatInput() {
    const input = document.getElementById("chatbot-input");

    if (!input) return;

    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 112)}px`;
}

export function scrollToBottom() {
    const body = document.getElementById("chatbot-body");

    if (body) body.scrollTop = body.scrollHeight;
}

export function addUserMessage(message) {
    const messages = document.getElementById("chatbot-messages");
    const messageContainer = document.createElement("div");

    activateConversationMode();
    messageContainer.className = "flex justify-end";
    messageContainer.innerHTML = `
        <div class="ml-auto max-w-[82%] break-words rounded-2xl rounded-br-md bg-gradient-to-br from-blue-700 to-blue-900 px-4 py-3 text-sm leading-5 text-white shadow-md">
            <p class="whitespace-pre-wrap">${DOMPurify.sanitize(message)}</p>
            <time class="mt-1.5 block text-right text-[10px] text-blue-100/75">${formatCurrentTime()}</time>
        </div>
    `;

    messages.appendChild(messageContainer);
}

export function addBotMessage(message) {
    const messages = document.getElementById("chatbot-messages");
    const messageContainer = document.createElement("div");
    const htmlMessage = DOMPurify.sanitize(marked.parse(message), {
        USE_PROFILES: { html: true },
    });

    messageContainer.className = "flex min-w-0 items-start gap-3";
    messageContainer.innerHTML = `
        ${renderBotAvatar("size-9")}

        <div class="min-w-0 max-w-[84%] break-words rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm leading-6 text-[#102653] shadow-sm [&_a]:break-all [&_a]:font-semibold [&_a]:text-blue-700 [&_a]:underline [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p:not(:last-child)]:mb-2 [&_strong]:font-bold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
            ${htmlMessage}
            <time class="mt-1.5 block text-right text-[10px] text-slate-400">${formatCurrentTime()}</time>
        </div>
    `;

    messages.appendChild(messageContainer);
}

export function showTypingIndicator() {
    const messages = document.getElementById("chatbot-messages");

    if (document.getElementById("chatbot-typing-indicator")) return;

    const typingContainer = document.createElement("div");
    typingContainer.id = "chatbot-typing-indicator";
    typingContainer.setAttribute("role", "status");
    typingContainer.setAttribute("aria-label", "ExploraBot está escribiendo");
    typingContainer.className = "flex items-start gap-3";
    typingContainer.innerHTML = `
        ${renderBotAvatar("size-9")}

        <div class="flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-slate-100 px-4 py-4 shadow-sm">
            <span class="size-2 animate-bounce rounded-full bg-slate-500 motion-reduce:animate-none"></span>
            <span class="size-2 animate-bounce rounded-full bg-slate-500 [animation-delay:150ms] motion-reduce:animate-none"></span>
            <span class="size-2 animate-bounce rounded-full bg-slate-500 [animation-delay:300ms] motion-reduce:animate-none"></span>
        </div>
    `;

    messages.appendChild(typingContainer);
    scrollToBottom();
}

export function removeTypingIndicator() {
    document.getElementById("chatbot-typing-indicator")?.remove();
}

export function resetChatUI() {
    const modal = document.getElementById("chatbot-modal");
    const messages = document.getElementById("chatbot-messages");
    const input = document.getElementById("chatbot-input");
    const initialHint = document.getElementById("chatbot-initial-hint");

    messages.innerHTML = initialChatContent();
    modal.dataset.conversationStarted = "false";

    input.value = "";
    input.disabled = false;
    input.placeholder = "Escribe tu mensaje...";
    input.style.height = "auto";

    initialHint?.classList.remove("hidden");
    removeTypingIndicator();
    updateSendButton(false);
    scrollToBottom();
}
