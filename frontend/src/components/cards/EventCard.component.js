import { Drama, Clock3, Users } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";

export function renderEventCard(event) {
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

    return `
        <article
            data-event-id="${event.id}"
            class="featured-event-card overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
        >

            <!-- Imagen -->
            <div class="relative h-44">

                <img
                    src="/src/assets/images/hero.png"
                    alt="${event.name}"
                    class="w-full h-full object-cover"
                >

                <!-- Categoría -->
                <div
                    class="absolute top-3 left-3 bg-pink-500 text-white rounded-full px-3 py-1.5 flex items-center gap-2 shadow-md"
                >

                    ${renderIconSvg(Drama,{
                        class:"size-4 text-white",
                        strokeWidth:2
                    })}

                    <span class="text-xs font-semibold">
                        ${event.category}
                    </span>

                </div>

                <!-- Fecha -->
                <div
                    class="absolute -bottom-5 left-4 w-16 h-16 rounded-2xl bg-white shadow-lg flex flex-col items-center justify-center"
                >

                    <span class="text-3xl font-bold leading-none text-slate-900">
                        ${day}
                    </span>

                    <span class="text-xs font-semibold text-pink-500 uppercase">
                        ${month}.
                    </span>

                </div>

            </div>

            <!-- Contenido -->
            <div class="px-4 pt-8 pb-4">

                <h2 class="text-2xl font-extrabold text-slate-900 leading-tight line-clamp-2">
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