import { getMessageFromAi } from "../../services/chat.service";
import { marked } from "marked";
import DOMPurify from "dompurify";

export function chatbot(){
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
        <!-- Modal -->
        <div id="chatbot-container" class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <section id="chatbot-modal" class="hidden w-[390px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
                <!-- == HEADER == -->
                <header class="h-18 bg-blue-950 text-white flex items-center justify-between px-5">
                    <!-- Información del chatbot -->
                    <div class="flex items-center gap-3">
                        <!-- Avatar -->
                        <div class="w-11 h-11 rounded-full bg-blue-800 flex items-center justify-center">
                            🤖
                        </div>
                        <!-- Nombre -->
                        <div>
                            <h3 class="font-bold">
                                Asistente Explora
                            </h3>
                            <p class="text-xs text-blue-200">
                                En línea
                            </p>
                        </div>
                    </div>

                    <!-- Botones -->
                    <div class="flex items-center gap-2">
                        <button id="chatbot-minimize" class="w-9 h-9 rounded-xl hover:bg-blue-800 transition cursor-pointer">
                            —
                        </button>
                        <button id="chatbot-close" class="w-9 h-9 rounded-xl hover:bg-red-500 transition cursor-pointer">
                            ✕
                        </button>
                    </div>
                </header>
                <!-- == BODY == -->
                <div id="chatbot-body" class="h-[420px] bg-slate-50 overflow-y-auto px-5 py-5 ">
                    <div id="chatbot-messages" class="flex flex-col gap-4 ">

                        <div class="flex flex-col gap-3">
                            <!-- Bot's initial message -->
                            <div class="flex items-start gap-3">
                                <!-- Avatar -->
                                <div class="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">
                                    🤖
                                </div>

                                <!-- Burbuja -->
                                <div class="bg-white rounded-2xl rounded-tl-sm shadow-sm border border-slate-200 px-4 py-3 max-w-[260px]">
                                    <p class="text-sm text-slate-700 leading-relaxed">
                                        ¡Hola! 👋
                                        <br><br>
                                        Soy el asistente de
                                        <strong>Barranquilla Explora</strong>.
                                        <br><br>
                                        Estoy aquí para ayudarte a descubrir lugares turísticos, restaurantes, hoteles y eventos.
                                    </p>
                                </div>
                            </div>

                            <!-- Cards de sugerencias (Actualizadas con efectos Premium de Hover, Active y Sombras Fuertes) -->
                            <div class="grid grid-cols-2 gap-3 mt-2 ml-13 max-w-[260px]">

                                <!-- places -->
                                <button id="card-lugares" class="bg-white border border-slate-200 rounded-2xl p-3 text-left shadow-[0_8px_20px_rgba(7,30,99,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(7,30,99,0.25)] active:scale-95 cursor-pointer">
                                    <div class="text-2xl mb-1">🏛</div>
                                    <h4 class="font-semibold text-xs text-blue-950">Lugares</h4>
                                    <p class="text-[10px] text-slate-500 mt-0.5 leading-tight">Sitios turísticos.</p>
                                </button>
                                <!-- restaurants -->
                                <button id="card-restaurantes" class="bg-white border border-slate-200 rounded-2xl p-3 text-left shadow-[0_8px_20px_rgba(7,30,99,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(7,30,99,0.25)] active:scale-95 cursor-pointer">
                                    <div class="text-2xl mb-1">🍽</div>
                                    <h4 class="font-semibold text-xs text-blue-950">Restaurantes</h4>
                                    <p class="text-[10px] text-slate-500 mt-0.5 leading-tight">Dónde comer.</p>
                                </button>
                                <!-- Lodging -->
                                <button id="card-hoteles" class="bg-white border border-slate-200 rounded-2xl p-3 text-left shadow-[0_8px_20px_rgba(7,30,99,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(7,30,99,0.25)] active:scale-95 cursor-pointer">
                                    <div class="text-2xl mb-1">🛏</div>
                                    <h4 class="font-semibold text-xs text-blue-950">Hospedajes</h4>
                                    <p class="text-[10px] text-slate-500 mt-0.5 leading-tight">Hoteles cercanos.</p>
                                </button>
                                <!-- Events -->
                                <button id="card-eventos" class="bg-white border border-slate-200 rounded-2xl p-3 text-left shadow-[0_8px_20px_rgba(7,30,99,0.12)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(7,30,99,0.25)] active:scale-95 cursor-pointer">
                                    <div class="text-2xl mb-1">🎉</div>
                                    <h4 class="font-semibold text-xs text-blue-950">Eventos</h4>
                                    <p class="text-[10px] text-slate-500 mt-0.5 leading-tight">Qué hacer hoy.</p>
                                </button>
                            </div>
                        </div>
                        
                            
                    </div>
                </div> 

                <footer class="border-t border-slate-200 bg-white p-4">

                    <form id="chatbot-form" class="flex items-end gap-3">
                        <textarea id="chatbot-input" rows="1" placeholder="Escribe un mensaje..." class=" text-[13px] flex-1 resize-none border border-slate-300 rounded-2xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 overflow-y-auto  max-h-24 "></textarea>
                        <button id="chatbot-send" type="submit" class="w-12 h-12 rounded-2xl bg-gray-300 text-white  transition cursor-pointer flex items-center justify-center">
                        ➤
                        </button>
                    </form>

                </footer>
            </section>
        </div>

    
        <!-- floating button -->
        
        
        <button id="chatbot-button" type="button" class="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#061747] via-[#071E63] to-[#0B2E8A] text-white shadow-[0_18px_38px_rgba(7,30,99,0.35)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(7,30,99,0.42)] active:scale-95" aria-label="Abrir asistente Explora" aria-expanded="false">
            <span class="h-9 w-9">
            ${BOT_ICON}
            </span>
        </button>









    `;

}

/* <span class="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#F5B400] shadow-[0_0_12px_rgba(245,180,0,0.9)]"></span>  */
// hover:bg-blue-900


// Open, close and minimize chatbot modal
function openChat() {
    const button = document.getElementById("chatbot-button");
    const modal = document.getElementById("chatbot-modal");
    button.addEventListener("click", () => {
        console.log("Abriendo chatbot");
        modal.classList.remove("hidden");
        button.classList.add("hidden");
    });
}
function closeChat(){

    const closeButton = document.getElementById("chatbot-close");
    const modal = document.getElementById("chatbot-modal");
    const button = document.getElementById("chatbot-button");
    closeButton.addEventListener("click", ()=>{
        modal.classList.add("hidden");
        button.classList.remove("hidden");
    });
}
function minimizeChat(){
    const minimizeButton = document.getElementById("chatbot-minimize");
    const modal = document.getElementById("chatbot-modal");
    const button = document.getElementById("chatbot-button");
    minimizeButton.addEventListener("click", ()=>{
        modal.classList.add("hidden");
        button.classList.remove("hidden");
    });
}


// pinta de azul el botón de enviar cuando hay texto en el textarea, y lo desactiva cuando no hay texto
    function updateSendButton(enabled){
        const sendButton = document.getElementById("chatbot-send");

        if(enabled){
            sendButton.classList.remove("bg-gray-300");
            sendButton.classList.add("bg-blue-950");
            sendButton.disabled = false;
        }else{
            sendButton.classList.remove("bg-blue-950");
            sendButton.classList.add("bg-gray-300");
            sendButton.disabled = true;
        }

    }
    export function toggleSendButton(){
        const input = document.getElementById('chatbot-input');

        input.addEventListener('input', () => {
            const hasText = input.value.trim().length > 0;
            updateSendButton(hasText);

        });

    }
    function handleInputKeyboard() {

        const input = document.getElementById("chatbot-input");

        input.addEventListener("keydown", (event) => {
            // Enter = enviar
            // Shift + Enter = nueva línea
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                document.getElementById("chatbot-form").requestSubmit();
            }

        });

    }
    function scrollToBottom(){
        const body = document.getElementById("chatbot-body");
        body.scrollTop = body.scrollHeight;
    }


    // const botResponses = [
        
    //     "¡Hola! 👋 ¿En qué puedo ayudarte?",
    //     "Con gusto puedo ayudarte a descubrir Barranquilla.",
    //     "¿Quieres recomendaciones de restaurantes?",
    //     "También puedo ayudarte con eventos y lugares turísticos.",
    //     "Estoy listo para ayudarte 😊"
    // ];

    function sendMessage() {

        const form = document.getElementById("chatbot-form");
        const input = document.getElementById("chatbot-input");

        form.addEventListener("submit", async (event) => {

            event.preventDefault();
            const message = input.value.trim();
            if (message === "") return;

            // Pintamos el mensaje del usuario
            addUserMessage(message);
            // Bajamos automáticamente
            scrollToBottom();
            // Limpiamos el textarea
            input.value = "";
            // El botón vuelve a gris
            updateSendButton(false);
            
            try {

                const response = await getMessageFromAi(message);
                console.log("Respuesta IA:", response);
                addBotMessage(response.data.reply);

            } catch (error) {
                console.error("Error al obtener la respuesta del chatbot:", error);
                addBotMessage("Lo siento, ocurrió un error al responder.");
            }

            scrollToBottom();

        });

    }

    function addUserMessage(message) {

        const messages = document.getElementById("chatbot-messages");
        const messageContainer = document.createElement("div");
        messageContainer.className = "flex justify-end items-start gap-3";

        messageContainer.innerHTML = `
            <div class=" bg-blue-950 text-white rounded-3xl rounded-tr-sm px-4 py-2 max-w-[280px] break-words shadow">
                ${message}
            </div>
            <div class=" w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center shrink-0">
                👤
            </div>
        `;

        messages.appendChild(messageContainer);
    }


    function addBotMessage(message) {
        const messages = document.getElementById("chatbot-messages");
        const messageContainer = document.createElement("div");

        const htmlMessage = DOMPurify.sanitize(
            marked.parse(message),
            {
                USE_PROFILES: {
                    html: true
                }
            }
        );

        messageContainer.className = "flex items-start gap-3";
        messageContainer.innerHTML = `
            <div
                class="w-10 h-10 rounded-full bg-blue-950 text-white flex items-center justify-center shrink-0">
                🤖
            </div>

            <div
                class="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px] shadow-sm break-words">
                ${htmlMessage}
            </div>
        `;

        messages.appendChild(messageContainer);
    }

    export function chatbotEvents(){

        openChat();
        closeChat();
        minimizeChat();
        toggleSendButton()
        handleInputKeyboard();
        sendMessage();
    }


/* <button id="chatbot-button"class=" w-16 h-16 rounded-full bg-blue-950 shadow-xl shadow-blue-900/40 flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-blue-900 active:scale-95 transition duration-300">

            <img src="/images/chatbot.png" alt="Chatbot" class="w-9 h-9 object-contain">

        </button> */