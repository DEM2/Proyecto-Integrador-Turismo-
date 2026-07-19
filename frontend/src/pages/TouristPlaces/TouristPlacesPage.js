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
import { alertaError } from "../../utils/alerts.js";
import { initFiltersScroll } from "../../controller/category.controller.js";

export function renderTouristPlacesPage() {
    return `
        ${renderMainNavigation()}

        <header class="tourist-hero relative isolate !h-auto !min-h-0 !pb-0 bg-[#06152f] max-lg:flex max-lg:flex-col max-lg:bg-[linear-gradient(90deg,rgba(3,43,55,0.98)_0%,rgba(3,32,50,0.92)_100%),linear-gradient(0deg,rgba(2,14,30,0.45),rgba(2,14,30,0.1))] max-lg:pb-[5.5rem]" aria-labelledby="destinations-hero-title">
          <div class="absolute inset-0 max-lg:relative max-lg:inset-auto max-lg:order-2 max-lg:z-10 max-lg:mx-5 max-lg:mt-4 max-lg:h-[200px] max-lg:overflow-visible max-lg:rounded-[1.8rem] sm:max-lg:mx-8 sm:max-lg:h-[25rem]">
            <div class="pointer-events-none absolute -inset-x-3 -inset-y-2 bottom-4 z-0 hidden rotate-2 rounded-[2.2rem] border border-cyan-300/35 bg-gradient-to-br from-amber-200/30 to-emerald-500-100/20 max-lg:block" aria-hidden="true"></div>
            <img
              src="/images/mallorquin.png"
              alt="Vista aérea de la Ciénaga de Mallorquín, sus manglares y sendero de madera"
              class="h-full w-full object-cover object-[65%_center] max-lg:relative max-lg:z-10 max-lg:rounded-[1.8rem] lg:object-center"
            />
            <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(3,43,55,0.97)_0%,rgba(3,32,50,0.92)_100%),linear-gradient(0deg,rgba(2,14,30,0.45),rgba(2,14,30,0.1))] max-lg:z-20 max-lg:rounded-[1.8rem] max-lg:bg-gradient-to-t max-lg:from-[#06152f]/55 max-lg:via-transparent max-lg:to-transparent lg:bg-[linear-gradient(90deg,rgba(3,43,55,0.98)_0%,rgba(3,37,53,0.94)_25%,rgba(4,31,48,0.72)_45%,rgba(4,25,43,0.24)_66%,rgba(4,25,43,0.04)_100%),linear-gradient(0deg,rgba(2,14,30,0.35),transparent_45%)]" aria-hidden="true"></div>

           
          </div>

          <div class="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:24px_24px]" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -left-44 top-8 size-[30rem] rounded-full border border-cyan-300/10" aria-hidden="true"></div>
          <div class="pointer-events-none absolute -left-32 top-20 size-[23rem] rounded-full border border-emerald-300/10" aria-hidden="true"></div>

          <div class="relative z-10 mx-auto flex max-w-[92rem] items-center px-5 py-12 max-lg:order-1 max-md:h-auto max-md:w-full max-md:px-5 max-md:py-0 max-md:pb-3 sm:px-8 md:max-lg:px-8 md:max-lg:pt-12 lg:min-h-[36rem] lg:px-12 lg:py-10 xl:min-h-[38rem]">
            <section class="w-full pt-5 max-w-2xl max-md:max-w-none">
              <p class="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md">
                ${renderIconSvg(Compass, { class: "size-4 text-cyan-300", strokeWidth: 2.2 })}
                Tu próxima parada
              </p>

              <h1 id="destinations-hero-title" class="mt-5 max-w-2xl text-[clamp(2.5rem,4vw,4rem)] font-black leading-[1.03] tracking-tight text-white max-md:text-[1.875rem] max-md:leading-[1.12] md:max-lg:text-[2.75rem]">
                <span class="block">Encuentra</span>
                <span class="block">lugares que</span>
                <span class="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">merecen ser</span>
                <span class="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300 bg-clip-text text-transparent">descubiertos.</span>
              </h1>

              <p class="mt-4 max-w-xl text-base leading-7 text-white/75 max-md:mt-3.5 max-md:text-sm max-md:leading-6 md:max-lg:mt-4 md:max-lg:text-[1.0625rem] md:max-lg:leading-[1.65] sm:text-lg">
                Historia, gastronomía, naturaleza y cultura local reunidas para ayudarte a explorar Barranquilla a tu manera.
              </p>

              <div class="[&>div]:!mt-6 max-md:!mt-5 max-md:max-w-none max-md:[&_input]:h-[52px] max-md:[&_input]:pl-4 [&_input:focus]:ring-cyan-400/30 md:max-lg:mt-6 md:max-lg:max-w-[34rem]">
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
   class="relative z-50 mx-auto w-full max-w-[80rem] px-4 pb-5 max-lg:order-3 max-lg:mt-4 sm:px-8 lg:absolute lg:left-1/2 lg:bottom-0 lg:-translate-x-1/2 lg:translate-y-1/2 lg:px-10 lg:pb-0"
  aria-label="Filtrar lugares por categoría"
>
  <div class="category-filters-panel rounded-[1.75rem] border border-slate-200 bg-white shadow-xl">
    <button type="button" data-category-filters-toggle="true" class="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left text-sm font-black text-blue-950 lg:hidden">
      Filtrar lugares
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
        </header>

        <main class="relative z-10 tourist-main mx-auto w-full max-w-[96rem] px-[14px] pb-6 pt-15 sm:px-8 sm:pb-12 md:max-lg:px-8 md:max-lg:py-6 lg:px-10 lg:pt-20">
          <header class="mb-7 flex items-center gap-3 max-md:mb-4 max-md:gap-2">
            ${renderIconSvg(MapPinned, {
              class: "size-8 text-emerald-400 max-md:size-7",
              strokeWidth: 2,
            })}

            <div>
              <p class="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 max-md:text-[0.625rem]">Explora</p>
              <h2 class="text-3xl font-bold text-[#0B2E69] max-md:text-2xl sm:text-4xl">Lugares activos</h2>
            </div>
          </header>

          <section
            id="destination_container"
            class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:max-lg:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
          </section>
        </main>
    `;
}

export async function initializeTouristPlacesPageEvents() {
    initializeMainNavigationEvents();

    const destinationContainer = document.getElementById("destination_container");
    const filtersContainer = document.getElementById("filters_container");
    const filtersToggle = document.querySelector("[data-category-filters-toggle='true']");
    const filtersContent = document.querySelector("[data-category-filters-content='true']");
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
            applyDestinationFilters();
        });
    });

    searchInput.setAttribute("aria-label", "Buscar lugares por nombre");
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
