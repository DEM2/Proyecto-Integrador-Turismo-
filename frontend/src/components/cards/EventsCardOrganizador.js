
import { CalendarDays, MapPin } from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";

function formatEventDate(date) {
  if (!date) {
    return "Por confirmar";
  }

  const parsedDate = new Date(date.includes("T") ? date : `${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  const day = parsedDate.getDate();
  const month = parsedDate
    .toLocaleDateString("es-CO", { month: "short" })
    .replace(".", "")
    .toLowerCase();
  const year = parsedDate.getFullYear();

  return `${day} ${month} ${year}`;
}

function getEventDateBadge(date) {
  if (!date) {
    return { day: "--", month: "PEND." };
  }

  const parsedDate = new Date(date.includes("T") ? date : `${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return { day: "--", month: "PEND." };
  }

  return {
    day: parsedDate.getDate(),
    month: parsedDate
      .toLocaleDateString("es-CO", { month: "short" })
      .replace(".", "")
      .toUpperCase(),
  };
}

export function renderEventCard(event) {
  const name = event.name || "Evento sin nombre";
  const address = event.address || "Lugar por confirmar";
  const startDate = formatEventDate(event.start_date);
  const endDate = formatEventDate(event.end_date);
  const dateBadge = getEventDateBadge(event.start_date);

  return `
    <article
      class="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:ring-blue-300 hover:shadow-2xl hover:shadow-slate-300/50"
    >
      <figure class="relative h-44 w-full shrink-0 overflow-hidden bg-slate-100">
        <img
          src="/images/hero.png"
          alt="${name}"
          class="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:saturate-110"
        />

        <div class="absolute left-3 top-3 flex min-w-14 flex-col items-center rounded-2xl bg-white px-2.5 py-2 text-blue-950 shadow-lg shadow-blue-950/15">
          <strong class="text-2xl font-black leading-none">${dateBadge.day}</strong>
          <span class="mt-1 text-[10px] font-black tracking-widest text-purple-600">${dateBadge.month}</span>
        </div>
      </figure>

      <section class="flex flex-1 flex-col px-5 pb-5 pt-2">
        <div class="mb-3">
          <span class="rounded-full bg-purple-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-purple-700">
            Evento publicado
          </span>
        </div>

        <h3 class="line-clamp-2 text-lg font-black leading-snug text-blue-950">
          ${name}
        </h3>

        <p class="mt-3 flex items-start gap-2 text-sm leading-5 text-slate-500">
          ${renderIconSvg(MapPin, {
            class: "mt-0.5 size-4 shrink-0 text-purple-500",
            "stroke-width": 2,
            "aria-hidden": "true",
          })}
          <span class="line-clamp-2">${address}</span>
        </p>

        <footer class="mt-auto pt-5">
          <div class="rounded-2xl bg-slate-50 px-3.5 py-3">
            <p class="flex items-center gap-2 text-xs font-semibold text-slate-600">
              ${renderIconSvg(CalendarDays, {
                class: "size-4 shrink-0 text-blue-700",
                "stroke-width": 2,
                "aria-hidden": "true",
              })}
              <span>${startDate}</span>
              <span class="text-slate-300">•</span>
              ${renderIconSvg(CalendarDays, {
                class: "size-4 shrink-0 text-blue-700",
                "stroke-width": 2,
                "aria-hidden": "true",
              })}
              <span>${endDate}</span>
            </p>
          </div>
        </footer>
      </section>
    </article>
  `;
}
