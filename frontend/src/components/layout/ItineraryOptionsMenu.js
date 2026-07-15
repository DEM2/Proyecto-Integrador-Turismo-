import { Route, Plus } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";

export function renderItineraryOptionsMenu(itineraries = []) {

  return `

    <div
      class="overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 w-72"
    >

      <!-- Header -->
      <header class="border-b border-slate-200 px-4 py-3">

        <h3 class="font-semibold text-slate-900">
          Añadir al itinerario
        </h3>

        <p class="text-xs text-slate-500 mt-1">
          Selecciona el itinerario donde deseas guardar este lugar.
        </p>

      </header>

      <!-- Lista -->

      <section class="max-h-72 overflow-y-auto">

        ${
          itineraries.length
            ? itineraries
                .map(
                  (itinerary) => `

            <button
              type="button"
              class="itinerary-option flex w-full items-start gap-3 px-4 py-3 transition hover:bg-violet-50 cursor-pointer"
              data-itinerary-id="${itinerary.id}"
            >

              <span class="mt-0.5 text-violet-600">

                ${renderIconSvg(Route, {
                  class: "size-5",
                  strokeWidth: 1.8,
                })}

              </span>

              <section class="text-left flex-1">

                <p class="font-semibold text-slate-900">
                  ${itinerary.name}
                </p>

                <p class="text-xs text-slate-500 mt-1">

                  ${itinerary.places_count ?? 0}
                  lugares

                  •

                  ${itinerary.events_count ?? 0}
                  eventos

                </p>

              </section>

            </button>

          `
                )
                .join("")
            : `

            <p class="px-4 py-6 text-center text-sm text-slate-500">

              No tienes itinerarios creados.

            </p>

          `
        }

      </section>

      <!-- Footer -->

      <footer class="border-t border-slate-200">

        <button
          id="btn-create-itinerary-menu"
          type="button"
          class="flex w-full items-center gap-3 px-4 py-3 font-medium text-violet-600 transition hover:bg-violet-50 cursor-pointer"
        >

          ${renderIconSvg(Plus, {
            class: "size-5",
            strokeWidth: 2,
          })}

          Crear nuevo itinerario

        </button>

      </footer>

    </div>

  `;
}