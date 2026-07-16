import {
  X,
  CalendarDays,
  MapPin,
  Globe,
  Lock,
  Route
} from "lucide";

import { renderIconSvg } from "../../utils/renderIcon.js";

function formatDate(date) {
  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function renderItineraryDetailModal(itinerary) {

  const places = itinerary.places || [];
  const events = itinerary.events || [];

  return `
<div
    id="itinerary-detail-modal"
    class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">

    <article
        class="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">

        <!-- Header -->

        <header
            class="flex items-center justify-between border-b border-slate-200 px-5 py-4">

            <section>

                <h2 class="text-xl font-bold text-slate-900">
                    ${itinerary.name}
                </h2>

                <div
                    class="mt-3 flex flex-wrap items-center gap-5 text-sm text-slate-500">

                    <span class="flex items-center gap-2">

                        ${renderIconSvg(CalendarDays,{
                            class:"size-4"
                        })}

                        ${formatDate(itinerary.start_date)}
                        -
                        ${formatDate(itinerary.closing_date)}

                    </span>

                    <span class="flex items-center gap-2">

                        ${
                          itinerary.is_public
                            ? renderIconSvg(Globe,{class:"size-4"})
                            : renderIconSvg(Lock,{class:"size-4"})
                        }

                        ${
                          itinerary.is_public
                            ? "Público"
                            : "Privado"
                        }

                    </span>

                </div>

            </section>

            <button
                id="btn-close-itinerary-detail"
                class="rounded-lg p-2 hover:bg-slate-100">

                ${renderIconSvg(X,{
                    class:"size-6"
                })}

            </button>

        </header>

        <!-- Descripción -->

        <section class="border-b border-slate-200 px-5 py-4">

            <p class="text-sm text-slate-600 leading-6">

                ${
                    itinerary.description ||
                    "Este itinerario no tiene descripción."
                }

            </p>

        </section>

        <!-- Contenido -->

        <section
            class="max-h-[320px] space-y-5 overflow-y-auto px-5 py-4">

            <section>

                <h3
                    class="mb-4 text-lg font-semibold text-slate-900">

                    Lugares

                </h3>

                ${
                    places.length

                    ?

                    places.map(place=>`

                        <article
                            class="mb-3 flex items-center gap-4 rounded-xl border border-slate-200 p-3">

                            <img
                                src="${place.image}"
                                class="h-16 w-20 rounded-lg object-cover">

                            <section class="flex-1">

                                <h4 class="font-semibold">

                                    ${place.name}

                                </h4>

                                <p class="text-sm text-slate-500">

                                    ${place.address}

                                </p>

                            </section>

                            ${renderIconSvg(MapPin,{
                                class:"size-5 text-violet-600"
                            })}

                        </article>

                    `).join("")

                    :

                    `<p class="text-slate-500">
                        No hay lugares agregados.
                    </p>`
                }

            </section>

            <section>

                <h3
                    class="mb-4 text-lg font-semibold text-slate-900">

                    Eventos

                </h3>

                ${
                    events.length

                    ?

                    events.map(event=>`

                        <article
                            class="mb-3 flex items-center gap-4 rounded-xl border border-slate-200 p-3">

                            <img
                                src="${event.image}"
                                class="h-16 w-20 rounded-lg object-cover">

                            <section class="flex-1">

                                <h4 class="font-semibold">

                                    ${event.name}

                                </h4>

                                <p class="text-sm text-slate-500">

                                    ${formatDate(event.start_date)}

                                </p>

                            </section>

                            ${renderIconSvg(Route,{
                                class:"size-5 text-blue-600"
                            })}

                        </article>

                    `).join("")

                    :

                    `<p class="text-slate-500">
                        No hay eventos agregados.
                    </p>`
                }

            </section>

        </section>

    </article>

</div>
`;
}

export function openItineraryDetailModal(itinerary){

    // Si ya hay un modal abierto, se elimina antes de abrir uno nuevo
    // para evitar ids duplicados en el DOM.
    document
        .querySelectorAll("#itinerary-detail-modal")
        .forEach(existing => existing.remove());

    const wrapper = document.createElement("div");

    wrapper.innerHTML = renderItineraryDetailModal(itinerary).trim();

    const modal = wrapper.firstElementChild;

    document.body.appendChild(modal);

    initializeItineraryDetailModal(modal);
}

function initializeItineraryDetailModal(modal){

    const closeModal = () => modal.remove();

    modal
        .querySelector("#btn-close-itinerary-detail")
        .addEventListener("click", closeModal);

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){
            closeModal();
        }

    });

}