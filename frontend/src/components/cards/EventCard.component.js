
import { renderIconSvg } from "../../utils/renderIcon.js";

import { Users, Clock3, ListPlus } from "lucide";

import { getSession } from "../../services/authService.js";
import { getCategoryStyle } from "./TouristPlaceCard.js";

export function renderEventCard(event) {
    const { bg, text, icon } = getCategoryStyle(event.category);
    const eventDate = new Date(event.start_date);
    const day = eventDate.getDate();
    const month = eventDate
        .toLocaleString("es-CO", { month: "short" })
        .replace(".", "")
        .toUpperCase();
    const endDate = event.end_date
        ? new Date(event.end_date).toLocaleDateString("es-CO", {
            day: "numeric",
            month: "short",
        })
        : "";
    const session = getSession();

const isExplorer =
    session?.user?.role === "explorador" ||
    session?.role === "explorador";

const eventId = event.id ?? event._id ?? "";

const optionsButton = isExplorer
    ? `
        <button
            type="button"
            aria-label="Agregar a itinerario"
            data-item-type="event"
            data-item-id="${eventId}"
            data-item-name="${event.name}"
            class="options-toggle-btn absolute top-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-3xl bg-white shadow-md transition hover:bg-violet-50 hover:text-violet-600 cursor-pointer z-20"
        >

            ${renderIconSvg(ListPlus,{
                class:"size-5",
                strokeWidth:2
            })}

        </button>
    `
    : "";

    return `
        <article
            data-event-id="${event.id}"
            class="featured-event-card overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >

            <!-- Imagen -->
            <div class="relative h-44">

                <img
                    src="/src/assets/images/hero.png"
                    alt="${event.name}"
                    class="w-full h-full object-cover"
                >

                <!-- Categoría -->
                <figcaption
                    style="background-color:${bg}; color:${text};"
                    class="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold">
                    <span class="flex items-center">${renderIconSvg(icon, { width: 12, height: 12, strokeWidth: 2.25 })}</span>
                    ${event.category}
                </figcaption>
                ${optionsButton}

                <div class="absolute -bottom-5 left-4 w-13 h-13 rounded-2xl bg-white shadow-lg flex flex-col items-center justify-center">
                    <span class="text-2xl font-bold leading-none text-slate-900">${day}</span>
                    <span class="text-xs font-semibold text-pink-500 uppercase">${month}.</span>
                </div>
            </div>

            <!-- Contenido -->
            <div class="px-4 pt-8 pb-4">

                <h2 class="text-1xl font-bold text-slate-900 leading-tight line-clamp-2">
                    ${event.name}
                </h2>

                <div class="mt-4 flex gap-2">
                    <img
                        src="/src/assets/icons/location3.svg"
                        alt="Ubicación"
                        class="w-4 h-4 mt-1 shrink-0"
                    >
                    <p class="text-sm text-slate-600 leading-5 line-clamp-2">
                        ${event.address}
                    </p>
                </div>

                <hr class="my-4 border-slate-200">

                <div class="flex items-center justify-between text-xs text-slate-600">
                    <div class="flex items-center gap-2">
                        ${renderIconSvg(Clock3,{
                            class:"size-4 text-pink-500",
                            strokeWidth:2
                        })}
                        <span>Finaliza ${endDate}</span>
                    </div>

                    <div class="w-px h-4 bg-slate-300"></div>

                    <div class="flex items-center gap-2">
                        ${renderIconSvg(Users,{
                            class:"size-4 text-pink-500",
                            strokeWidth:2
                        })}
                        <span>Evento público</span>
                    </div>
                </div>

            </div>

        </article>
    `;
}
