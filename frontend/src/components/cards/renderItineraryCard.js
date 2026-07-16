import { ChevronRight, CalendarDays, MapPin } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";

function formatDate(date) {
  return new Date(date).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
  });
}

export function renderItineraryCard(itinerary) {

  const startDate = formatDate(itinerary.start_date);
  const endDate = formatDate(itinerary.closing_date);

  return `
    <article
      data-itinerary-id="${itinerary.id}"
      class="
        group
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-3
        transition
        hover:border-violet-300
        hover:shadow-lg
        cursor-pointer
      "
    >

      <!-- Imagen -->
      <figure
        class="h-18 w-22 shrink-0 overflow-hidden rounded-xl"
      >

        <img
          src="${itinerary.image || "/src/assets/images/hero.png"}"
          alt="${itinerary.name}"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        >

      </figure>

      <!-- Información -->
      <section class="flex-1 min-w-0">

        <h3
          class="
            text-lg
            font-semibold
            text-slate-900
            leading-6
            break-words
          "
        >
          ${itinerary.name}
        </h3>

        <p
          class="mt-1 text-sm text-slate-500"
        >
          ${startDate} - ${endDate}
        </p>

        <div
          class="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-600"
        >

          <span class="flex items-center gap-1">

            ${renderIconSvg(MapPin,{
              class:"size-4 text-slate-500",
              strokeWidth:2
            })}

            ${itinerary.places_count ?? 0} lugares

          </span>

          <span class="flex items-center gap-1">

            ${renderIconSvg(CalendarDays,{
              class:"size-4 text-slate-500",
              strokeWidth:2
            })}

            ${itinerary.events_count ?? 0} eventos

          </span>

        </div>

      </section>

      <!-- Flecha -->
      <span
        class="
          shrink-0
          text-slate-400
          transition
          group-hover:text-violet-600
          group-hover:translate-x-1
        "
      >

        ${renderIconSvg(ChevronRight,{
          class:"size-6",
          strokeWidth:2
        })}

      </span>

    </article>
  `;
}