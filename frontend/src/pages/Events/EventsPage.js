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

    <main class="events-page w-full flex flex-col font-sans bg-slate-50">

    <!-- HERO -->
    <section class="events-hero relative isolate overflow-hidden bg-[#071a36]" aria-labelledby="hero-title">
      <div class="absolute -left-24 top-16 size-72 rounded-full bg-fuchsia-600/20 blur-3xl" aria-hidden="true"></div>
      <div class="absolute bottom-0 right-1/3 size-80 rounded-full bg-orange-500/15 blur-3xl" aria-hidden="true"></div>
      <div class="absolute inset-0 opacity-[0.07]" aria-hidden="true" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 24px 24px;"></div>

      <div class="relative mx-auto grid min-h-[34rem] max-w-7xl items-center gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-16">
        <div class="max-w-xl">
          <p class="inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-rose-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-rose-200">
            ${renderIconSvg(Ticket, { class: "size-4", strokeWidth: 2.2 })}
            La agenda de la ciudad
          </p>

          <h1 id="hero-title" class="mt-6 text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Siempre hay algo
            <span class="block bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">por celebrar.</span>
          </h1>

          <p class="mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
            Conciertos, festivales, ferias y planes que convierten cada semana en una nueva historia para vivir en Barranquilla.
          </p>

          ${serchBar("Buscar conciertos, festivales y eventos...")}
        </div>

        <figure class="relative mx-auto w-full max-w-2xl lg:ml-auto">
          <div class="absolute -inset-3 rotate-2 rounded-[2.2rem] border border-rose-300/20 bg-gradient-to-br from-rose-500/20 to-orange-400/10"></div>
          <div class="relative h-72 overflow-hidden rounded-[1.8rem] border border-white/15 shadow-2xl shadow-black/30 sm:h-96">
            <img src="/src/assets/images/ff.jpg" alt="Evento cultural en Barranquilla" class="h-full w-full object-cover transition duration-700 hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#071a36]/80 via-transparent to-transparent"></div>
          </div>

          <figcaption class="absolute -bottom-5 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-blue-950 shadow-xl backdrop-blur sm:left-8 sm:right-auto sm:min-w-72">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              ${renderIconSvg(Music2, { class: "size-5", strokeWidth: 2.2 })}
            </span>
            <p class="flex-1 text-sm"><strong class="block font-black">Ritmo todo el año</strong>Encuentra tu próximo plan</p>
            ${renderIconSvg(CalendarDays, { class: "size-5 text-orange-500", strokeWidth: 2 })}
          </figcaption>
        </figure>
      </div>
    </section>

         <!-- Categorías -->
            <section
              id="filters_container"
              class="mt-6 mb-8 flex justify-center gap-4  px-10">
            </section>


      <!-- CONTENIDO -->
  <section
      class="events-main px-10 pt-8 pb-10 grid grid-cols-1 xl:grid-cols-1">
       

          <section class="flex items-center gap-3 mb-6">

           

        ${renderIconSvg(CalendarDays, {
            class: "size-8 text-pink-500",
            strokeWidth: 2,
        })}
    </div>

    <div>
        <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Explora
        </p>

        <h2 class="text-4xl font-bold text-blue-950">
            Eventos activos
        </h2>

    </div>

  </section>

        <figure
          id="eventos-destacados"
          class="grid grid-cols-1 xl:grid-cols-5 gap-6">
        </figure>

      </section>

    </main>
  `;
}

export async function initializeEventsPageEvents() {
    initializeMainNavigationEvents();
    

    try {
        let selectedCategory = "Todos";
        let searchText = "";
        const eventosContainer = document.getElementById("eventos-destacados");
        const searchInput = document.getElementById("destination_search");
        const eventos = await getAllEvent();

        function renderEvents(events) {
    eventosContainer.innerHTML = events
        .map((evento) => renderEventCard(evento))
        .join("");

    document.querySelectorAll(".featured-event-card")
        .forEach((card) => {
            card.addEventListener("click", () => {
                const id = card.dataset.eventId;

                localStorage.setItem("selectedEventId", id);

                navigateTo("/detailEvent");
            });
        });

    initializeItineraryMenus();
}
              if (eventos) {
          renderEvents(eventos);
      }

        function applyEventsFilters() {
            const filtered = applyFilters(
                eventos,
                selectedCategory,
                searchText,
            );

            renderEvents(filtered);
        }
        const categories = [
            {
                name: "Todos",
                description: "Explora todos los eventos",
                icon: House,
                color: "bg-blue-600",
            },

            {
                name: "Festival",
                description: "Celebraciones y festivales",
                icon: CalendarDays,
                color: "bg-red-500",
            },

            {
                name: "Concierto",
                description: "Música en vivo",
                icon: Music,
                color: "bg-purple-500",
            },

            {
                name: "Cultura",
                description: "Arte y patrimonio",
                icon: Landmark,
                color: "bg-pink-500",
            },

            {
                name: "Deportes",
                description: "Eventos deportivos",
                icon: Trophy,
                color: "bg-green-600",
            },

            {
                name: "Gastronomía",
                description: "Sabores del Caribe",
                icon: UtensilsCrossed,
                color: "bg-orange-500",
            },

            {
                name: "Feria",
                description: "Exposiciones y negocios",
                icon: Store,
                color: "bg-cyan-500",
            },

            {
                name: "Teatro",
                description: "Obras y espectáculos",
                icon: Drama,
                color: "bg-indigo-500",
            },

            {
                name: "Infantil",
                description: "Diversión para niños",
                icon: Baby,
                color: "bg-yellow-500",
            },
        ];

        const filtersContainer = document.getElementById("filters_container");

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
    } catch (error) {
        alertaError(error.message);
    }
}
