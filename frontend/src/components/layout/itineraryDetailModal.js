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
        class="w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        <!-- Header -->

        <header
            class="flex items-center justify-between border-b border-slate-200 px-7 py-5">

            <section>

                <h2 class="text-2xl font-bold text-slate-900">
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

        <section class="border-b border-slate-200 px-7 py-5">

            <p class="text-slate-600 leading-7">

                ${
                    itinerary.description ||
                    "Este itinerario no tiene descripción."
                }

            </p>

        </section>

        <!-- Estadísticas -->

        <section
            class="grid grid-cols-2 gap-6 border-b border-slate-200 px-7 py-5">

            <article
                class="rounded-2xl bg-violet-50 p-5">

                <p class="text-sm text-slate-500">

                    Lugares

                </p>

                <h3 class="mt-1 text-3xl font-bold text-violet-700">

                    ${places.length}

                </h3>

            </article>

            <article
                class="rounded-2xl bg-blue-50 p-5">

                <p class="text-sm text-slate-500">

                    Eventos

                </p>

                <h3 class="mt-1 text-3xl font-bold text-blue-700">

                    ${events.length}

                </h3>

            </article>

        </section>

        <!-- Contenido -->

        <section
            class="max-h-[430px] space-y-6 overflow-y-auto px-7 py-6">

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

                                    ${place.place}

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

    document.body.insertAdjacentHTML(
        "beforeend",
        renderItineraryDetailModal(itinerary)
    );

    initializeItineraryDetailModal();
}

function initializeItineraryDetailModal(){

    const modal=document.getElementById("itinerary-detail-modal");

    modal
        .querySelector("#btn-close-itinerary-detail")
        .addEventListener("click",()=>modal.remove());

    modal.addEventListener("click",(e)=>{

        if(e.target===modal){
            modal.remove();
        }

    });

}