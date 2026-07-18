import {
    renderMainNavigation,
    initializeMainNavigationEvents,
} from "../../components/layout/MainNavigation.js";
import { getDestinations } from "../../services/destinationService.js";
import { renderTouristPlaceCard } from "../../components/cards/TouristPlaceCard.js";
import {
    renderCategoryFilterCard,
    setActiveCategoryFilter,
} from "../../components/cards/CategoryFilterCard.js";
import {
    House,
    ChevronRight,
    MapPinned,
    MapPinPen,
     Grid2x2,
  CalendarDays,
  Music2,
  Landmark,
  Trophy,
  UtensilsCrossed,
  Tent,
    Compass,
} from "lucide";
import { renderIconSvg } from "../../utils/renderIcon.js";
import { initializeItineraryMenus } from "../../components/itineraryMenu.events.js";
import { applyFilters } from "../../components/Filter/filter.component.js";
import { serchBar } from "../../components/layout/serchbar.component.js";
import { navigateTo } from "../../router/AppRouter.js";
import { alertaError } from "../../utils/alertsss.js";
import { initFiltersScroll } from "../../controller/category.controller.js";

export function renderTouristPlacesPage() {
    return `
        ${renderMainNavigation()}

        <header class="tourist-hero relative isolate !h-auto !min-h-0  !pb-0 bg-[#06152f]" aria-labelledby="destinations-hero-title">
          <div class="absolute inset-0">
            <img
              src="/images/mallorquin.png"
              alt="Vista aérea de la Ciénaga de Mallorquín, sus manglares y sendero de madera"
              class="h-full w-full object-cover object-[65%_center] lg:object-center"
            />
            <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,43,55,0.97)_0%,rgba(3,32,50,0.92)_100%),linear-gradient(0deg,rgba(2,14,30,0.45),rgba(2,14,30,0.1))] lg:bg-[linear-gradient(90deg,rgba(3,43,55,0.98)_0%,rgba(3,37,53,0.94)_25%,rgba(4,31,48,0.72)_45%,rgba(4,25,43,0.24)_66%,rgba(4,25,43,0.04)_100%),linear-gradient(0deg,rgba(2,14,30,0.35),transparent_45%)]" aria-hidden="true"></div>

           
          </div>

          <div class="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -left-44 top-8 size-[30rem] rounded-full border border-cyan-300/10" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -left-32 top-20 size-[23rem] rounded-full border border-emerald-300/10" aria-hidden="true"></div>

          <div class="relative mx-auto flex max-w-[92rem] items-center px-5 py-12 sm:px-8 lg:min-h-[36rem] lg:px-12 lg:py-10 xl:min-h-[38rem]">
            <section class="w-full max-w-2xl">
              <p class="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md">
                ${renderIconSvg(Compass, { class: "size-4 text-cyan-300", strokeWidth: 2.2 })}
                Tu próxima parada
              </p>

              <h1 id="destinations-hero-title" class="mt-5 max-w-2xl text-[clamp(2.5rem,4vw,4rem)] font-black leading-[1.03] tracking-tight text-white">
                <span class="block">Encuentra</span>
                <span class="block">lugares que</span>
                <span class="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">merecen ser</span>
                <span class="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">descubiertos.</span>
              </h1>

              <p class="mt-4 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Historia, gastronomía, naturaleza y cultura local reunidas para ayudarte a explorar Barranquilla a tu manera.
              </p>

              <div class="[&>div]:!mt-6 [&_input:focus]:ring-cyan-400/30">
                ${serchBar("Buscar museos, parques y lugares...")}
              </div>

             <div class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-semibold">
  <span class="inline-flex items-center gap-2 text-amber-300 transition-colors hover:text-amber-200">
    ${renderIconSvg(MapPinPen, { class: "size-5", strokeWidth: 2 })}
    Crea tu propia ruta
  </span>
</div>

            </section>
          </div>

         <section
   class="absolute left-1/2 bottom-0 z-50 w-full max-w-[80rem] -translate-x-1/2 translate-y-1/2 px-4 sm:px-8 lg:px-10"
  aria-label="Filtrar destinos por categoría"
>
  <div
    class="rounded-[1.75rem] bg-white px-5 py-3 shadow-xl border border-slate-200"
  >
    <div class="filters-scroll-wrapper" id="filters_scroll_wrapper">
      <div
        id="filters_container"
        class="flex w-full items-center justify-between gap-3"
      ></div>

      <button
        type="button"
        id="filters_scroll_next"
        class="filters-scroll-chevron"
        aria-label="Ver más categorías"
      >
        ${renderIconSvg(ChevronRight, { class: "size-4 text-slate-500", strokeWidth: 2.5 })}
      </button>
    </div>

    <div class="filters-pagination" id="filters_pagination" aria-hidden="true"></div>
  </div>
</section>
        </header>

        <main class="relative z-10 tourist-main mx-auto w-full max-w-[96rem] !px-5 !pb-12 !pt-28 sm:!px-8 lg:!px-10 lg:!pt-32">
          <header class="mb-7 flex items-center gap-3">
            ${renderIconSvg(MapPinned, {
              class: "size-8 text-emerald-400",
              strokeWidth: 2,
            })}

            <div>
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Explora</p>
              <h2 class="text-3xl font-bold text-[#0B2E69] sm:text-4xl">Destinos Activos</h2>
            </div>
          </header>

          <section
            id="destination_container"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          </section>
        </main>
    `;
}

export async function initializeTouristPlacesPageEvents() {
    initializeMainNavigationEvents();

    const destinationContainer = document.getElementById("destination_container");
    const filtersContainer = document.getElementById("filters_container");
    const searchInput = document.getElementById("destination_search");
    let destinations = [];
    let selectedCategory = "Todos";
    let searchText = "";

  const categories = [
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

    function renderDestinations(list) {
        destinationContainer.innerHTML = list
            .map((destination) => renderTouristPlaceCard(destination))
            .join("");

        document.querySelectorAll(".tourist-place-card").forEach((card) => {
            card.addEventListener("click", (event) => {
                if (event.target.closest(".options-toggle-btn")) return;

                localStorage.setItem("selectedPlaceId", card.dataset.placeId);
                navigateTo("/detailPlace");
            });
        });

        initializeItineraryMenus();
    }

    function applyDestinationFilters() {
        renderDestinations(applyFilters(destinations, selectedCategory, searchText));
    }

    filtersContainer.innerHTML = categories
        .map((category) => renderCategoryFilterCard(category))
        .join("");
    initFiltersScroll();
    const filterButtons = filtersContainer.querySelectorAll("[data-category]");
    setActiveCategoryFilter(filtersContainer, filterButtons[0]);

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
            setActiveCategoryFilter(filtersContainer, button);
            applyDestinationFilters();
        });
    });

    searchInput.setAttribute("aria-label", "Buscar destinos por nombre");
    searchInput.addEventListener("input", (event) => {
        searchText = event.target.value.toLowerCase().trim();
        applyDestinationFilters();
    });

    try {
        destinations = await getDestinations();
        renderDestinations(destinations);
    } catch (error) {
        alertaError(error.message);
    }
}
