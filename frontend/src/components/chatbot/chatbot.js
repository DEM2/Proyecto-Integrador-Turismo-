import {
    CalendarDays,
    Info,
    Lightbulb,
    Map,
    MapPin,
    Minus,
    Send,
    X,
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";

const BOT_ICON = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v2.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <rect x="5" y="7" width="14" height="11" rx="4" stroke="currentColor" stroke-width="2"/>
        <path d="M9 12h.01M15 12h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M9.5 15c1.3 1 3.7 1 5 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 12H2.5M21.5 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
`;

export function renderBotAvatar(sizeClass = "size-10") {
    return `
        <span class="relative flex ${sizeClass} shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_45deg,#1456d9,#1cbc55,#f6c400,#e52329,#1456d9)] p-[2px] shadow-sm" aria-hidden="true">
            <span class="flex size-full items-center justify-center rounded-full bg-white text-[#0b3ea8]">
                <span class="size-[68%]">${BOT_ICON}</span>
            </span>
        </span>
    `;
}

export function chatbot() {
    return `
        <div id="chatbot-container" class="fixed bottom-4 right-4 z-[70] flex flex-col items-end">
            <section
                id="chatbot-modal"
                role="dialog"
                aria-modal="true"
                aria-hidden="true"
                aria-labelledby="chatbot-title"
                class="hidden h-[min(680px,calc(100dvh-32px))] w-[min(420px,calc(100vw-24px))] flex-col overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_24px_70px_rgba(15,35,85,0.25)] max-sm:fixed max-sm:inset-x-2 max-sm:bottom-2 max-sm:h-[calc(100dvh-16px)] max-sm:w-auto max-sm:rounded-[22px]"
            >
                <div class="h-1 shrink-0 bg-[linear-gradient(90deg,#1456d9_0%,#1456d9_25%,#1cbc55_25%,#1cbc55_50%,#f6c400_50%,#f6c400_75%,#e52329_75%,#e52329_100%)]" aria-hidden="true"></div>

                <header class="flex shrink-0 items-center justify-between bg-[#071d49] px-5 py-4 text-white">
                    <div class="flex min-w-0 items-center gap-3">
                        ${renderBotAvatar("size-12")}

                        <div class="min-w-0">
                            <h2 id="chatbot-title" class="truncate text-base font-bold">ExploraBot</h2>
                            <p class="truncate text-xs text-blue-100/85">Tu guía de Barranquilla</p>
                            <p class="mt-0.5 flex items-center gap-1.5 text-[11px] text-blue-100/80">
                                <span class="size-2 rounded-full bg-[#1cbc55] shadow-[0_0_8px_rgba(28,188,85,0.7)]" aria-hidden="true"></span>
                                En línea
                            </p>
                        </div>
                    </div>

                    <div class="ml-3 flex shrink-0 items-center gap-1">
                        <button id="chatbot-minimize" type="button" aria-label="Minimizar chatbot" class="flex size-10 cursor-pointer items-center justify-center rounded-xl text-blue-100 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none">
                            ${renderIconSvg(Minus, { class: "size-5", strokeWidth: 2 })}
                        </button>
                        <button id="chatbot-close" type="button" aria-label="Cerrar chatbot" class="flex size-10 cursor-pointer items-center justify-center rounded-xl text-blue-100 transition-colors hover:bg-red-500/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none">
                            ${renderIconSvg(X, { class: "size-5", strokeWidth: 2 })}
                        </button>
                    </div>
                </header>

                <div id="chatbot-body" class="min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-white to-slate-50/70 px-5 py-5 max-sm:px-4" tabindex="0">
                    <div id="chatbot-messages" aria-live="polite" aria-relevant="additions" class="flex min-w-0 flex-col gap-5">
                        ${initialChatContent()}
                    </div>
                </div>

                <footer class="shrink-0 border-t border-slate-200/80 bg-white px-4 py-4">
                    <form id="chatbot-form" class="flex items-end gap-2 rounded-[24px] border border-slate-300 bg-white p-1.5 pl-2 transition focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 motion-reduce:transition-none">
                        <textarea
                            id="chatbot-input"
                            rows="1"
                            placeholder="Escribe tu mensaje..."
                            aria-label="Mensaje para ExploraBot"
                            class="min-h-11 max-h-28 min-w-0 flex-1 resize-none overflow-y-auto border-0 bg-transparent px-3 py-3 text-sm leading-5 text-[#102653] outline-none placeholder:text-slate-400 disabled:cursor-wait disabled:text-slate-400"
                        ></textarea>

                        <button id="chatbot-send" type="submit" disabled aria-label="Enviar mensaje" class="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#1456d9] text-white shadow-[0_8px_20px_rgba(20,86,217,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#0b3ea8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none disabled:hover:translate-y-0 motion-reduce:transition-none">
                            ${renderIconSvg(Send, { class: "size-5", strokeWidth: 2 })}
                        </button>
                    </form>

                    <p id="chatbot-initial-hint" class="mt-3 flex items-center gap-2 px-2 text-xs text-slate-500 max-[380px]:hidden">
                        ${renderIconSvg(Info, { class: "size-4 shrink-0 text-blue-500", strokeWidth: 2 })}
                        Puedes escribir tu pregunta en cualquier momento.
                    </p>
                </footer>
            </section>
        </div>

        <button
            id="chatbot-button"
            type="button"
            aria-label="Abrir ExploraBot"
            aria-expanded="false"
            aria-controls="chatbot-modal"
            class="fixed bottom-5 right-5 z-[70] flex size-16 items-center justify-center rounded-full border border-white/15 bg-[#071d49] text-white shadow-[0_16px_40px_rgba(7,29,73,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,29,73,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 active:scale-95 motion-reduce:transition-none"
        >
            ${renderBotAvatar("size-12")}
            <span class="pointer-events-none absolute bottom-0.5 right-0.5 size-3.5 rounded-full border-2 border-white bg-[#1cbc55] shadow-[0_0_10px_rgba(28,188,85,0.65)]" aria-hidden="true"></span>
        </button>
    `;
}

export function initialChatContent() {
    return `
        <div class="flex items-start gap-3">
            ${renderBotAvatar("size-9")}

            <div class="max-w-[84%] rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm leading-6 text-[#102653] shadow-sm">
                <p>¡Hola! 👋</p>
                <p class="mt-1.5">Soy <strong>ExploraBot</strong>, tu asistente personal.</p>
                <p class="mt-1.5">Puedo ayudarte a descubrir lugares, eventos, itinerarios y mucho más sobre Barranquilla.</p>
            </div>
        </div>

        <div id="chatbot-initial-guidance" class="ml-12 flex flex-col gap-4 max-sm:ml-0">
            <p class="text-sm font-semibold text-[#102653]">¿Sobre qué te gustaría saber hoy?</p>

            <div class="flex flex-wrap gap-2.5">
                ${quickAction("card-lugares", MapPin, "Lugares", "text-rose-500")}
                ${quickAction("card-eventos", CalendarDays, "Eventos", "text-amber-500")}
                ${quickAction("card-itinerarios", Map, "Itinerarios", "text-emerald-600")}
                ${quickAction("card-consejos", Lightbulb, "Consejos", "text-blue-600")}
            </div>
        </div>
    `;
}

function quickAction(id, icon, label, iconClass) {
    return `
        <button id="${id}" type="button" class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-[#102653] shadow-sm transition hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 active:scale-95 motion-reduce:transition-none sm:text-sm">
            ${renderIconSvg(icon, { class: `size-4 ${iconClass}`, strokeWidth: 2 })}
            ${label}
        </button>
    `;
}
