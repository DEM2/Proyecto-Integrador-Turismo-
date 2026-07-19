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
    ChevronRight,
    CalendarDays,
    Grid2x2,
    Landmark,
    Trophy,
    UtensilsCrossed,
    Tent, 
    Ticket,
    Music2,
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import { serchBar } from "../../components/layout/serchbar.component.js";
import { getAllEvent } from "../../services/eventService.js";
import { applyFilters } from "../../components/Filter/filter.component.js";
import { alertaError } from "../../utils/alerts.js";
import { initFiltersScroll } from "../../controller/category.controller.js"
export function renderEventsPage() {
    return `
    ${renderMainNavigation()}

    <main class="events-page flex w-full flex-col overflow-x-clip bg-slate-50 font-sans">

    <!-- HERO -->
    <section class="events-hero relative z-10 isolate overflow-visible bg-[#061a37]" aria-labelledby="hero-title">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(126,34,206,0.24),transparent_27%),radial-gradient(circle_at_68%_62%,rgba(249,115,22,0.12),transparent_24%)]" aria-hidden="true"></div>
      <div class="absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
      <div class="absolute -left-44 top-8 size-[30rem] rounded-full border border-violet-300/10" aria-hidden="true"></div>
      <div class="absolute -left-32 top-20 size-[23rem] rounded-full border border-violet-300/10" aria-hidden="true"></div>

      <div class="events-hero-frame relative mx-auto grid min-h-[36rem] max-w-[92rem] items-center gap-12 px-5 pb-14 pt-12 max-md:h-auto max-md:min-h-[42rem] max-md:grid-cols-1 max-md:gap-6 max-md:pb-2 max-md:pt-7 sm:px-8 md:max-lg:h-[360px] lg:grid-cols-[1fr_1.08fr] lg:px-12 lg:pb-16 lg:pt-16 xl:gap-16">
        <div class="mx-auto w-full max-w-2xl lg:mx-0">
          <p class="inline-flex items-center gap-2 rounded-full border border-rose-300/40 bg-rose-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-rose-100 backdrop-blur-sm">
            ${renderIconSvg(Ticket, { class: "size-4", strokeWidth: 2.2 })}
            La agenda de la ciudad
          </p>

          <h1 id="hero-title" class="mt-7 text-4xl font-black leading-[1.03] tracking-tight text-white max-md:text-[1.875rem] max-md:leading-[1.15] sm:text-5xl md:max-lg:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]">
            <span class="block sm:whitespace-nowrap">Siempre hay algo</span>
            <span class="block bg-gradient-to-r from-pink-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">por celebrar.</span>
          </h1>

          <p class="mt-6 max-w-lg text-base leading-7 text-slate-300 max-md:mt-3.5 max-md:text-sm max-md:leading-6 sm:text-lg md:max-lg:mt-4 md:max-lg:text-lg md:max-lg:leading-[1.6]">
            Conciertos, festivales, ferias y planes que convierten cada semana en una nueva historia para vivir en Barranquilla.
          </p>

          ${serchBar("Buscar conciertos, festivales y eventos...")}
        </div>

        <figure class="relative mx-auto w-full max-w-3xl pb-6 max-md:max-w-none max-md:pb-0 lg:ml-auto">
          <div class="absolute -inset-x-3 -inset-y-2 bottom-4 rotate-2 rounded-[2.2rem] border border-rose-300/35 bg-gradient-to-br from-fuchsia-500/25 to-orange-400/10"></div>
          <div class="relative h-72 overflow-hidden rounded-[1.8rem] border border-white/15 shadow-[0_30px_80px_rgba(2,8,23,0.5)] max-md:h-[200px] sm:h-[25rem] xl:h-[27rem]">
            <img src="/src/assets/images/ff.jpg" alt="Artista del Carnaval de Barranquilla realizando un espectáculo de fuego" class="h-full w-full object-cover object-center transition duration-700 hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#071a36]/80 via-transparent to-transparent"></div>
          </div>

          <figcaption class="absolute bottom-0 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl border border-white/30 bg-white/95 px-4 py-3 text-blue-950 shadow-[0_18px_45px_rgba(2,8,23,0.3)] backdrop-blur max-md:static max-md:mx-auto max-md:mt-[-2.5rem] max-md:w-[calc(100%-2rem)] sm:left-8 sm:right-auto sm:min-w-80">
            <span class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              ${renderIconSvg(Music2, { class: "size-5", strokeWidth: 2.2 })}
            </span>
            <p class="flex-1 text-sm"><strong class="block font-black">Ritmo todo el año</strong>Encuentra tu próximo plan</p>
            ${renderIconSvg(CalendarDays, { class: "size-5 text-orange-500", strokeWidth: 2 })}
          </figcaption>
        </figure>
      </div>

      <!-- Categorías -->
         <section
   class="relative z-50 mx-auto w-full max-w-[80rem] px-4 pb-5 max-lg:order-3 max-lg:mt-4 sm:px-8 lg:absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2 lg:px-10 lg:pb-0"
  aria-label="Filtrar eventos por categoría"
>
  <div class="category-filters-panel rounded-[1.75rem] border border-slate-200 bg-white shadow-xl">
    <button type="button" data-category-filters-toggle="true" class="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left text-sm font-black text-blue-950 lg:hidden">
      Filtrar eventos
      <span aria-hidden="true" class="text-xl leading-none text-blue-600">+</span>
    </button>

    <div data-category-filters-content="true" class="hidden px-5 py-3 lg:block">
    <div class="filters-scroll-wrapper" id="filters_scroll_wrapper">
      <div
        id="filters_container"
        class="flex w-full flex-nowrap items-center justify-start gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-md:gap-2 max-md:p-0.5 max-md:snap-x max-md:snap-mandatory md:max-lg:mt-4 md:max-lg:mb-6 md:max-lg:gap-3 lg:justify-between lg:overflow-x-visible"
      ></div>

      <button
        type="button"
        id="filters_scroll_next"
        class="filters-scroll-chevron hidden"
        aria-label="Ver más categorías"
      >
        ${renderIconSvg(ChevronRight, { class: "size-4 text-slate-500", strokeWidth: 2.5 })}
      </button>
    </div>

    <div class="filters-pagination" id="filters_pagination" aria-hidden="true"></div>
    </div>
  </div>
</section>
    </section>

    <!-- CONTENIDO -->
    <section class="events-main mx-auto grid w-full max-w-[96rem] grid-cols-1 px-5 pb-12 pt-15 sm:px-8 sm:pt-10 md:max-lg:px-8 md:max-lg:py-6 lg:px-10 lg:pt-20">
      <header class="mb-7 flex items-center gap-3 max-md:mb-4 max-md:gap-2">
        ${renderIconSvg(CalendarDays, {
          class: "size-8 text-pink-500 max-md:size-7",
          strokeWidth: 2,
        })}

        <div>
          <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 max-md:text-[0.625rem]">Explora</p>
          <h2 class="text-3xl font-bold text-blue-950 max-md:text-2xl sm:text-4xl">Eventos activos</h2>
        </div>
      </header>

      <div
        id="eventos-destacados"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-lg:gap-5 md:max-lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
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
    const filtersToggle = document.querySelector("[data-category-filters-toggle='true']");
    const filtersContent = document.querySelector("[data-category-filters-content='true']");
    const categories =  [
  {
    name: "Todos",
    icon: Grid2x2,
    color: "bg-blue-600",
    activeColor: "#2563eb",
    activeGlow: "rgba(37, 99, 235, 0.28)",
  },
  {
    name: "Festival",
    icon: Tent,
    color: "bg-pink-500",
    activeColor: "#ec4899",
    activeGlow: "rgba(236,72,153,.28)",
  },
  {
    name: "Concierto",
    icon: Music2,
    color: "bg-violet-500",
    activeColor: "#8b5cf6",
    activeGlow: "rgba(139,92,246,.28)",
  },
  {
    name: "Cultura",
    icon: Landmark,
    color: "bg-fuchsia-500",
    activeColor: "#c026d3",
    activeGlow: "rgba(192,38,211,.28)",
  },
  {
    name: "Deportes",
    icon: Trophy,
    color: "bg-green-500",
    activeColor: "#22c55e",
    activeGlow: "rgba(34,197,94,.28)",
  },
  {
    name: "Gastronomía",
    icon: UtensilsCrossed,
    color: "bg-orange-500",
    activeColor: "#ea580c",
    activeGlow: "rgba(234,88,12,.28)",
  },
  {
    name: "Feria",
    icon: CalendarDays,
    color: "bg-amber-500",
    activeColor: "#f59e0b",
    activeGlow: "rgba(245,158,11,.28)",
  },
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
     initFiltersScroll();

    if (filtersToggle && filtersContent) {
        filtersToggle.addEventListener("click", () => {
            filtersContent.classList.toggle("hidden");
        });
    }

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
