import {
    renderMainNavigation,
    initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { renderCategoryFilterCard, setActiveCategoryFilter } from "../../components/cards/CategoryFilterCard.js";
import { renderEventCalendar } from "../../components/common/EventCalendar.js";
import {renderEventCard} from "../../components/cards/EventCard.component.js"
import { navigateTo } from "../../router/AppRouter.js";
import {
    House,
    CalendarDays,
    Music,
    Landmark,
    Trophy,
    UtensilsCrossed,
    Store,
    Drama,
    Baby,
    Ticket,
    Music2,
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import { serchBar } from "../../components/layout/serchbar.component.js";
import { getAllEvent } from "../../services/eventService.js";
import { applyFilters } from "../../components/Filter/filter.component.js";
import { alertaError } from "../../utils/alertsss.js";

export function renderEventsPage() {
    return `
    ${renderMainNavigation()}

    <main class="events-page flex w-full flex-col bg-slate-50 font-sans">

    <!-- HERO -->
    <section class="events-hero relative isolate overflow-hidden bg-[#061a37]" aria-labelledby="hero-title">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(126,34,206,0.24),transparent_27%),radial-gradient(circle_at_68%_62%,rgba(249,115,22,0.12),transparent_24%)]" aria-hidden="true"></div>
      <div class="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
      <div class="absolute -left-44 top-8 size-[30rem] rounded-full border border-violet-300/10" aria-hidden="true"></div>
      <div class="absolute -left-32 top-20 size-[23rem] rounded-full border border-violet-300/10" aria-hidden="true"></div>

      <div class="relative mx-auto grid min-h-[36rem] max-w-[92rem] items-center gap-12 px-5 pb-14 pt-12 sm:px-8 lg:grid-cols-[1fr_1.08fr] lg:px-12 lg:pb-16 lg:pt-16 xl:gap-16">
        <div class="mx-auto w-full max-w-2xl lg:mx-0">
          <p class="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-rose-100 backdrop-blur-sm">
            ${renderIconSvg(Ticket, { class: "size-4", strokeWidth: 2.2 })}
            La agenda de la ciudad
          </p>

          <h1 id="hero-title" class="mt-7 text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]">
            <span class="block sm:whitespace-nowrap">Siempre hay algo</span>
            <span class="block bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">por celebrar.</span>
          </h1>

          <p class="mt-6 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
            Conciertos, festivales, ferias y planes que convierten cada semana en una nueva historia para vivir en Barranquilla.
          </p>

          ${serchBar("Buscar conciertos, festivales y eventos...")}
        </div>

        <figure class="relative mx-auto w-full max-w-3xl pb-6 lg:ml-auto">
          <div class="absolute -inset-x-3 -inset-y-2 bottom-4 rotate-2 rounded-[2.2rem] border border-rose-300/35 bg-gradient-to-br from-fuchsia-500/25 to-orange-400/10"></div>
          <div class="relative h-72 overflow-hidden rounded-[1.8rem] border border-white/15 shadow-[0_30px_80px_rgba(2,8,23,0.5)] sm:h-[25rem] xl:h-[27rem]">
            <img src="/src/assets/images/ff.jpg" alt="Artista del Carnaval de Barranquilla realizando un espectáculo de fuego" class="h-full w-full object-cover object-center transition duration-700 hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#071a36]/80 via-transparent to-transparent"></div>
          </div>

          <figcaption class="absolute bottom-0 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-white/30 bg-white/95 px-4 py-3 text-blue-950 shadow-[0_18px_45px_rgba(2,8,23,0.3)] backdrop-blur sm:left-8 sm:right-auto sm:min-w-80">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              ${renderIconSvg(Music2, { class: "size-5", strokeWidth: 2.2 })}
            </span>
            <p class="flex-1 text-sm"><strong class="block font-black">Ritmo todo el año</strong>Encuentra tu próximo plan</p>
            ${renderIconSvg(CalendarDays, { class: "size-5 text-orange-500", strokeWidth: 2 })}
          </figcaption>
        </figure>
      </div>

      <!-- Categorías -->
      <section class="relative mx-auto w-full max-w-[96rem] px-4 pb-12 sm:px-8 lg:px-10" aria-label="Filtrar eventos por categoría">
        <div class="rounded-[1.75rem] border border-white/15 bg-white/[0.035] p-3 shadow-[0_18px_55px_rgba(2,8,23,0.18)] backdrop-blur-md">
          <div
            id="filters_container"
            class="!m-0 !flex !w-full !grid-cols-none !justify-start !gap-3 !overflow-x-auto !p-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden xl:!justify-center">
          </div>
        </div>
      </section>
    </section>

    <!-- CONTENIDO -->
    <section class="events-main mx-auto grid w-full max-w-[96rem] grid-cols-1 px-5 pb-12 pt-10 sm:px-8 lg:px-10 lg:pt-12">
      <header class="mb-7 flex items-center gap-3">
        ${renderIconSvg(CalendarDays, {
          class: "size-8 text-pink-500",
          strokeWidth: 2,
        })}

        <div>
          <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Explora</p>
          <h2 class="text-3xl font-bold text-blue-950 sm:text-4xl">Eventos activos</h2>
        </div>
      </header>

      <div
        id="eventos-destacados"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
      </div>
    </section>

    </main>
  `;
}

export async function initializeEventsPageEvents() {
    initializeMainNavigationEvents();
    let selectedCategory = "Todos";
    let searchText = "";
    let eventos = [];
    const eventosContainer = document.getElementById("eventos-destacados");
    const searchInput = document.getElementById("destination_search");
    const filtersContainer = document.getElementById("filters_container");
    const categories = [
        { name: "Todos", description: "Explora todos los eventos", icon: House, color: "bg-blue-600", activeColor: "#2563eb", activeGlow: "rgba(37, 99, 235, 0.28)" },
        { name: "Festival", description: "Celebraciones y festivales", icon: CalendarDays, color: "bg-red-500", activeColor: "#ef4444", activeGlow: "rgba(239, 68, 68, 0.28)" },
        { name: "Concierto", description: "Música en vivo", icon: Music, color: "bg-purple-500", activeColor: "#9333ea", activeGlow: "rgba(147, 51, 234, 0.28)" },
        { name: "Cultura", description: "Arte y patrimonio", icon: Landmark, color: "bg-pink-500", activeColor: "#db2777", activeGlow: "rgba(219, 39, 119, 0.28)" },
        { name: "Deportes", description: "Eventos deportivos", icon: Trophy, color: "bg-green-600", activeColor: "#16a34a", activeGlow: "rgba(22, 163, 74, 0.28)" },
        { name: "Gastronomía", description: "Sabores del Caribe", icon: UtensilsCrossed, color: "bg-orange-500", activeColor: "#ea580c", activeGlow: "rgba(234, 88, 12, 0.28)" },
        { name: "Feria", description: "Exposiciones y negocios", icon: Store, color: "bg-cyan-500", activeColor: "#0891b2", activeGlow: "rgba(8, 145, 178, 0.28)" },
        { name: "Teatro", description: "Obras y espectáculos", icon: Drama, color: "bg-indigo-500", activeColor: "#4f46e5", activeGlow: "rgba(79, 70, 229, 0.28)" },
        { name: "Infantil", description: "Diversión para niños", icon: Baby, color: "bg-yellow-500", activeColor: "#d97706", activeGlow: "rgba(217, 119, 6, 0.28)" },
    ];

    function renderEvents(events) {
        eventosContainer.innerHTML = events
            .map((evento) => renderEventCard(evento))
            .join("");

        document.querySelectorAll(".featured-event-card").forEach((card) => {
            card.addEventListener("click", () => {
                localStorage.setItem("selectedEventId", card.dataset.eventId);
                navigateTo("/detailEvent");
            });
        });

        initializeItineraryMenus();
    }

    function applyEventsFilters() {
        renderEvents(applyFilters(eventos, selectedCategory, searchText));
    }

    filtersContainer.innerHTML = categories
        .map((category) => renderCategoryFilterCard(category))
        .join("");

    const filterButtons = filtersContainer.querySelectorAll("[data-category]");
    setActiveCategoryFilter(filtersContainer, filterButtons[0]);

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
            setActiveCategoryFilter(filtersContainer, button);
            applyEventsFilters();
        });
    });

    searchInput.addEventListener("input", (event) => {
        searchText = event.target.value.toLowerCase().trim();
        applyEventsFilters();
    });

    try {
        eventos = await getAllEvent();
        renderEvents(eventos);
    } catch (error) {
        alertaError(error.message);
    }
}
