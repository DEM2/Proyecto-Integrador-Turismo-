import { MessageSquareText } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon";
import { getSession } from "../../services/authService.js";
import { createReview } from "../../services/EventReview.service.js";
import { alertaError, alertaExitosa } from "../../utils/alertsss.js";


export function RenderCommentariesModal() {
    return `
            <!-- Overlay -->
    <div
    id="commentary-modal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <!-- Modal -->
    <section
        class="w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">

        <!-- Header -->
        <header class="flex items-start justify-between p-6 border-b border-slate-200">

        <div class="flex gap-4">

            <div class="w-14 h-14 rounded-full bg-blue-700 flex items-center justify-center">
                ${renderIconSvg(MessageSquareText,{
                    class: "text-white   size-6",
                    strokeWidth: 1.8,
                })}
            </div>

            <div>

            <h2 class="text-3xl font-bold text-blue-950">
                Tu opinión cuenta
            </h2>

            <p class="text-slate-500 mt-1">
                Comparte tu experiencia con otros exploradores.
            </p>

            </div>

        </div>

        <button
            id = "button_x"
            class="text-3xl text-slate-500 hover:text-red-500 transition">

            ×

        </button>

        </header>

        <!-- Body -->
        <main class="p-6 flex flex-col gap-8">

        <!-- Score -->
        <section>

            <h3 class="text-xl font-bold text-blue-950 mb-5">
            ¿Cómo calificarías tu experiencia?
            </h3>

            <div
            id="score-container"
            class="flex justify-center gap-3">

            <button
                data-score="1"
                class="star text-5xl text-yellow-400 transition hover:scale-110">

                ☆

            </button>

            <button
                data-score="2"
                class="star text-5xl text-yellow-400 transition hover:scale-110">

                ☆

            </button>

            <button
                data-score="3"
                class="star text-5xl text-yellow-400 transition hover:scale-110">

                ☆

            </button>

            <button
                data-score="4"
                class="star text-5xl text-yellow-400 transition hover:scale-110">

                ☆

            </button>

            <button
                data-score="5"
                class="star text-5xl text-yellow-400 transition hover:scale-110">

                ☆

            </button>

            </div>

            <p class="text-center text-slate-500 mt-3">
            Haz clic en una estrella para calificar
            </p>

        </section>

        <!-- Comentario -->
        <section>

            <label
            for="comment"
            class="block text-xl font-bold text-blue-950 mb-3">

            Déjanos tu comentario

            </label>

            <textarea
            id="comment"
            maxlength="300"
            placeholder="Escribe aquí tu experiencia..."
            class="w-full h-36 rounded-2xl border border-slate-300 resize-none p-4 outline-none focus:ring-2 focus:ring-blue-500"></textarea>

            <div class="flex justify-end mt-2">

            <span
                id="counter"
                class="text-sm text-slate-500">

                0 / 300

            </span>

            </div>

        </section>

        </main>

        <!-- Footer -->
        <footer class="flex justify-end gap-4 p-6 border-t border-slate-200">

        <button
            id = "button_cancelar" class="px-8 py-3 rounded-xl border-2 border-blue-700 text-blue-700 font-semibold hover:bg-blue-50 transition">

            Cancelar

        </button>

        <button
             id = "button_publicar" class="px-8 py-3 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-800 transition">

            Publicar

        </button>

        </footer>

    </section>

    </div>

    `
    
}

function closeModal() {
    document.getElementById("commentary-modal").remove();
}

export function SaveCommentaries(id_event, reloadComments) {

    const cancelar = document.getElementById("button_cancelar");
    const publicar = document.getElementById("button_publicar");
    const stars = document.querySelectorAll(".star");
    const cerrar = document.getElementById("button_x")

    let score = 0;

    
    stars.forEach((star) => {
    star.addEventListener("click", () => {
        score = Number(star.dataset.score);

        stars.forEach((s) => {

            if (Number(s.dataset.score) <= score) {
                s.textContent = "★";
            } else {
                s.textContent = "☆";
            }

        });
    });
});
    
   publicar.addEventListener("click", async () => {

    const comment = document.getElementById("comment").value.trim();

    if (score === 0) {
        alertaError("Selecciona una calificación.");
        return;
    }

    if (comment === "") {
        alertaError("Escribe un comentario.");
        return;
    }

    const session = getSession();

    if (!session) {
        alertaError("Debes iniciar sesión.");
        return;
    }

    const review = {

        id_user: session.user.id,

        comments: comment,

        score

    };

    try {

        await createReview(id_event, review);

        await reloadComments();

        closeModal();

        alertaExitosa("Comentario guardado.");

    } catch (error) {

        alertaError(error.message || "No fue posible guardar el comentario.");

    }

});
const textarea = document.getElementById("comment");
const counter = document.getElementById("counter");

textarea.addEventListener("input", () => {
    counter.textContent = `${textarea.value.length} / 300`;
});

cancelar.addEventListener("click", () => {
    closeModal();
});

cerrar.addEventListener("click", () => {
    closeModal();
});

}
