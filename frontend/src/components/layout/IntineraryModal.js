import { Route, X, Info, CalendarDays } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { createItinerary } from "../../services/itineraries.service.js";
import { getSession } from "../../services/authService.js";
import { alertaError, alertaExitosa } from "../../utils/alertsss.js";

export function renderCreateItineraryModal() {
  return `
    <div
      id="modal-create-itinerary"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >

      <article
        class="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >

        <!-- Header -->
        <header class="flex items-center justify-between border-b border-slate-200 px-6 py-4">

          <div class="flex items-center gap-3">

            <span class="text-violet-600">
              ${renderIconSvg(Route, {
                class: "size-6",
                strokeWidth: 1.8,
              })}
            </span>

            <h2 class="text-xl font-bold text-slate-900">
              Crear nuevo itinerario
            </h2>

          </div>

          <button
            id="btn-close-modal"
            class="rounded-lg p-2 transition hover:bg-slate-100"
          >

            ${renderIconSvg(X, {
              class: "size-5 text-slate-600",
              strokeWidth: 2,
            })}

          </button>

        </header>

        <!-- Body -->
        <section class="space-y-4 p-5">

          <!-- Nombre -->
          <section>

            <label
              for="itinerary-name"
              class="mb-2 block text-sm font-semibold text-slate-800"
            >
              Nombre del itinerario
            </label>

            <input
              id="itinerary-name"
              type="text"
              placeholder="Barranquilla en un día"
              class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            />

          </section>

          <!-- Fechas -->
          <section class="grid grid-cols-2 gap-4">

            <div>

              <label
                for="itinerary-start-date"
                class="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
              >

                <span class="text-violet-600">
                  ${renderIconSvg(CalendarDays, {
                    class: "size-4",
                    strokeWidth: 1.8,
                  })}
                </span>

                Fecha de inicio

              </label>

              <input
                id="itinerary-start-date"
                type="date"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

            </div>

            <div>

              <label
                for="itinerary-end-date"
                class="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
              >

                <span class="text-violet-600">
                  ${renderIconSvg(CalendarDays, {
                    class: "size-4",
                    strokeWidth: 1.8,
                  })}
                </span>

                Fecha de finalización

              </label>

              <input
                id="itinerary-end-date"
                type="date"
                class="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />

            </div>

          </section>

          <!-- Descripción -->
          <section>

            <label
              for="itinerary-description"
              class="mb-2 block text-sm font-semibold text-slate-800"
            >
              Descripción
              <span class="font-normal text-slate-500">
                (opcional)
              </span>
            </label>

            <textarea
              id="itinerary-description"
              rows="2"
              placeholder="Describe brevemente tu recorrido..."
              class="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            ></textarea>

          </section>

          <!-- Visibilidad -->
          <section>

            <label class="mb-3 block text-sm font-semibold text-slate-800">
              Visibilidad
            </label>

            <div class="flex gap-8">

              <label class="flex cursor-pointer items-center gap-2">

                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked
                  class="accent-violet-600"
                />

                <span class="font-medium text-slate-700">
                  Público
                </span>

              </label>

              <label class="flex cursor-pointer items-center gap-2">

                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  class="accent-violet-600"
                />

                <span class="font-medium text-slate-700">
                  Privado
                </span>

              </label>

            </div>

          </section>

          <!-- Información -->
          <section
            class="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3"
          >

            <span class="text-violet-600 mt-0.5">

              ${renderIconSvg(Info, {
                class: "size-5",
                strokeWidth: 2,
              })}

            </span>

            <p class="text-sm leading-6 text-slate-600">
              Después de crear el itinerario podrás agregar destinos y eventos
              desde sus respectivas tarjetas utilizando el botón
              <strong>"Añadir al itinerario"</strong>.
            </p>

          </section>

        </section>

        <!-- Footer -->
        <footer class="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

          <button
            id="btn-cancel-itinerary"
            class="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancelar
          </button>

          <button
            id="btn-save-itinerary"
            class="rounded-xl bg-violet-600 px-5 py-2.5 font-semibold text-white transition hover:bg-violet-700"
          >
            Crear itinerario
          </button>

        </footer>

      </article>

    </div>
  `;
}


export function openCreateItineraryModal(onCreated) {
  document.body.insertAdjacentHTML(
    "beforeend",
    renderCreateItineraryModal()
  );

  initializeCreateItineraryModalEvents(onCreated);
}

export function closeCreateItineraryModal() {
  document.getElementById("modal-create-itinerary")?.remove();
}

function initializeCreateItineraryModalEvents(onCreated) {

  const modal = document.getElementById("modal-create-itinerary");
  const article = modal.querySelector("article");

  // Cerrar con la X
  document
    .getElementById("btn-close-modal")
    .addEventListener("click", closeCreateItineraryModal);

  // Cerrar con Cancelar
  document
    .getElementById("btn-cancel-itinerary")
    .addEventListener("click", closeCreateItineraryModal);
  
  document
  .getElementById("btn-save-itinerary")
  .addEventListener("click", () => handleCreateItinerary(onCreated));

  // Cerrar haciendo clic en el fondo oscuro
  modal.addEventListener("click", () => {
    closeCreateItineraryModal();
  });

  // Evitar cerrar al hacer clic dentro del modal
  article.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

async function handleCreateItinerary(onCreated) {
  const session = getSession();

  const name = document
    .getElementById("itinerary-name")
    .value
    .trim();

  const description = document
    .getElementById("itinerary-description")
    .value
    .trim();

  const start_date = document.getElementById(
    "itinerary-start-date"
  ).value;

  const closing_date = document.getElementById(
    "itinerary-end-date"
  ).value;

  const visibility = document.querySelector(
    'input[name="visibility"]:checked'
  ).value;

  // Validaciones

  if (!name) {
    alertaError("Ingrese un nombre");
    return;
  }

  if (!start_date) {
    alertaError("Seleccione la fecha de inicio");
    return;
  }

  if (!closing_date) {
    alertaError("Seleccione la fecha de finalización");
    return;
  }
  const is_public = visibility === "public";
  try {

 await createItinerary({
    name,
    description,
    start_date,
    closing_date,
    is_public,
    id_user: session.user.id
});

    alertaExitosa("Itinerario creado");

    closeCreateItineraryModal();

    onCreated?.();

  } catch (error) {

    alertaError(error.message || "No fue posible crear el itinerario.");

  }

}
