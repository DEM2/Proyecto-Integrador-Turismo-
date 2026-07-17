export function chatbot() {
    // Icono SVG utilizado en el botón flotante.
    const BOT_ICON = `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 3v2.2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <rect x="5" y="7" width="14" height="11" rx="4" stroke="currentColor" stroke-width="2"/>
            <path d="M9 12h.01M15 12h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M9.5 15c1.3 1 3.7 1 5 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 12H2.5M21.5 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;

    return `
        <!-- Contenedor principal -->
        <div id="chatbot-container" class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">

            <!-- Modal del chatbot -->
            <section id="chatbot-modal" class="hidden w-[390px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

                <!-- Header -->
                <header class="h-18 bg-blue-950 text-white flex items-center justify-between px-5">

                    <!-- Información del chatbot -->
                    <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-full bg-blue-800 flex items-center justify-center">🤖</div>

                        <div>
                            <h3 class="font-bold">Asistente Explora</h3>
                            <p class="text-xs text-blue-200">En línea</p>
                        </div>
                    </div>

                    <!-- Botones para minimizar y cerrar -->
                    <div class="flex items-center gap-2">
                        <button id="chatbot-minimize" class="w-9 h-9 rounded-xl hover:bg-blue-800 transition cursor-pointer">—</button>
                        <button id="chatbot-close" class="w-9 h-9 rounded-xl hover:bg-red-500 transition cursor-pointer">✕</button>
                    </div>
                </header>

                <!-- Cuerpo del chatbot -->
                <div id="chatbot-body" class="h-[420px] bg-slate-50 overflow-y-auto px-5 py-5">
                    <div id="chatbot-messages" class="flex flex-col gap-4">
                        ${initialChatContent()}
                    </div>
                </div>

                <!-- Área para escribir mensajes -->
                <footer class="border-t border-slate-200 bg-white p-4">
                    <form id="chatbot-form" class="flex items-end gap-3">

                        <!-- Campo de texto -->
                        <textarea id="chatbot-input" rows="1" placeholder="Escribe un mensaje..." class="text-[13px] flex-1 resize-none border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 overflow-y-auto max-h-24"></textarea>

                        <!-- Botón para enviar -->
                        <button id="chatbot-send" type="submit" disabled class="w-12 h-12 rounded-2xl bg-gray-300 text-white transition cursor-pointer flex items-center justify-center">➤</button>
                    </form>
                </footer>
            </section>
        </div>

        <!-- Botón flotante que abre el chatbot -->
        <button id="chatbot-button" type="button" class="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#061747] via-[#071E63] to-[#0B2E8A] text-white shadow-[0_18px_38px_rgba(7,30,99,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(7,30,99,0.42)] active:scale-95" aria-label="Abrir asistente Explora" aria-expanded="false">
            <span class="h-9 w-9">${BOT_ICON}</span>
        </button>
    `;
}

// Genera el contenido inicial del chatbot.
// También se utiliza cuando el usuario cierra y reinicia la conversación.
export function initialChatContent() {
    return `
        <div class="flex flex-col gap-3">

            <!-- Mensaje inicial -->
            <div class="flex items-start gap-3">

                <!-- Avatar del chatbot -->
                <div class="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">🤖</div>

                <!-- Burbuja del mensaje inicial -->
                <div class="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 px-4 py-3 max-w-[260px]">
                    <p class="text-sm text-slate-700 leading-relaxed">
                        ¡Hola! 👋
                        <br><br>
                        Soy el asistente de <strong>Barranquilla Explora</strong>.
                        <br><br>
                        Estoy aquí para ayudarte a descubrir lugares turísticos, restaurantes, itinerarios y eventos.
                    </p>
                </div>
            </div>

            <!-- Tarjetas de preguntas rápidas -->
            <div class="grid grid-cols-2 gap-3 mt-2 ml-13 max-w-[260px]">
                ${quickCard("card-lugares", "🏛", "Lugares", "Sitios turísticos.")}
                ${quickCard("card-restaurantes", "🍽", "Restaurantes", "Dónde comer.")}
                ${quickCard("card-itinerarios", "🗺", "Itinerarios", "Planifica tu viaje.")}
                ${quickCard("card-eventos", "🎉", "Eventos", "Qué hacer hoy.")}
            </div>
        </div>
    `;
}

// Genera cada tarjeta rápida para evitar repetir el mismo HTML cuatro veces.
function quickCard(id, icon, title, description) {
    return `
        <button id="${id}" class="bg-white border border-slate-200 rounded-2xl p-3 text-left shadow-[0_8px_20px_rgba(7,30,99,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(7,30,99,0.25)] active:scale-95 cursor-pointer">
            <div class="text-2xl mb-1">${icon}</div>
            <h4 class="font-semibold text-xs text-blue-950">${title}</h4>
            <p class="text-[10px] text-slate-500 mt-0.5 leading-tight">${description}</p>
        </button>
    `;
}


/* <span class="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#F5B400] shadow-[0_0_12px_rgba(245,180,0,0.9)]"></span>  */

/* <button id="chatbot-button"class=" w-16 h-16 rounded-full bg-blue-950 shadow-xl shadow-blue-900/40 flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-blue-900 active:scale-95 transition duration-300">

            <img src="/images/chatbot.png" alt="Chatbot" class="w-9 h-9 object-contain">

        </button> */